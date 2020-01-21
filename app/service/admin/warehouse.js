const { Service } = require("egg");

class WarehouseService extends Service {
    async queryWarehouses({
        id,
        sellerId,
        sellerIds,
        keywords,
        pageIndex = 1,
        pageSize = 100
    }) {
        let where = '1=1';
        let params = [];

        if (id) {
            where += ' and id=?';
            params.push(id);
        }

        if (sellerId) {
            where += ' and sellerId=?';
            params.push(sellerId);
        } else if (Array.isArray(sellerIds) && sellerIds.length) {
            where += ' and sellerId in (?)';
            params.push(sellerIds);
        }

        if (keywords) {
            where += ' and CONCAT(name,tags,address) like ?';
            params.push(`%keywords%`);
        }

        const conn = await this.app.mysql.get('stock');
        const rows = await conn.query(`select id,sellerId,name,provinceCode,cityCode,districtCode,address,creator,createDt,modifyer,modifyDt from warehouse where ${where} limit ${(pageIndex - 1) * pageSize},${pageSize}`, params);

        if (rows.length) {
            const districtCodes = rows.map(row => row.districtCode);
            const { data: areaList } = await this.app.baseRPC.invoke('address.listAreaInfoByDistrictCodes', [districtCodes]);

            if (areaList && areaList.length) {
                rows.forEach((row) => {
                    const area = areaList.find(area => area.districtCode == row.districtCode);
                    if (area) {
                        row.provinceName = area.provinceName;
                        row.cityName = area.cityName;
                        row.districtName = area.districtName;
                    }
                });
            }
        }

        return { success: true, data: rows };
    }

    async getMyWarehouses() {
        const mySellers = await this.ctx.getMySellers();
        if (!mySellers.success) {
            return mySellers;
        }
        if (!mySellers.data.length) {
            return { success: true, code: 0, data: [] };
        }

        const conn = await this.app.mysql.get('stock');
        const rows = await conn.query(`select id,sellerId,name,provinceCode,cityCode,districtCode,address from warehouse where sellerId in (${mySellers.data.map(seller => seller.id).join(',')})`);
        return { success: true, code: 0, data: rows };
    }

    async addWarehouse({
        sellerId,
        name,
        tags,
        provinceCode,
        cityCode,
        districtCode,
        address,
        creator,
    }) {
        const conn = await this.app.mysql.get('stock');
        const res = await conn.insert('warehouse', {
            sellerId,
            name,
            tags,
            provinceCode,
            cityCode,
            districtCode,
            address,
            creator,
            createDt: new Date()
        });

        return { success: true, id: res.insertId };
    }

    async updateWarehouse({
        id,
        sellerId,
        name,
        tags,
        provinceCode,
        cityCode,
        districtCode,
        address,
    }) {
        const conn = await this.app.mysql.get('stock');

        await conn.update('warehouse', {
            sellerId,
            name,
            tags,
            provinceCode,
            cityCode,
            districtCode,
            address
        }, {
            where: {
                id
            }
        });

        return { success: true };
    }
}

module.exports = WarehouseService;