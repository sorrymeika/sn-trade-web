const { Service } = require("egg");

class WarehouseService extends Service {
    async queryWarehouses({
        id,
        sellerId,
        keywords,
        pageIndex = 1,
        pageSize = 100
    }) {
        let sellerIds;

        if (sellerId) {
            const isMySellerResult = await this.ctx.helper.isMySeller(sellerId);
            if (!isMySellerResult.success) {
                return isMySellerResult;
            }
        } else {
            sellerIds = await this.ctx.helper.getMySellerIds();
        }

        const result = await this.ctx.dao.warehouse.query({
            id,
            sellerId,
            sellerIds,
            keywords,
            pageIndex,
            pageSize
        });

        if (result.data.length) {
            const districtCodes = result.data.map(row => row.districtCode);
            const { data: areaList } = await this.app.baseRPC.invoke('address.listAreaInfoByDistrictCodes', [districtCodes]);

            if (areaList && areaList.length) {
                result.data.forEach((row) => {
                    const area = areaList.find(area => area.districtCode == row.districtCode);
                    if (area) {
                        row.provinceName = area.provinceName;
                        row.cityName = area.cityName;
                        row.districtName = area.districtName;
                    }
                });
            }
        }

        return { success: true, data: result.data, total: result.total };
    }

    async getMyWarehouses() {
        const sellerIds = await this.ctx.helper.getMySellerIds();
        if (!sellerIds.length) {
            return { success: true, code: 0, data: [] };
        }
        const rows = await this.ctx.dao.warehouse.getWarehousesBySellerId(sellerIds);
        return { success: true, code: 0, data: rows };
    }

    async addWarehouse(data) {
        await this.ctx.helper.validateMySeller(data.sellerId);
        const res = await this.ctx.dao.warehouse.add('warehouse', data);
        return { success: true, id: res.insertId };
    }

    async updateWarehouse(data) {
        await this.ctx.dao.warehouse.update(data);
        return { success: true };
    }
}

module.exports = WarehouseService;