const { Dao } = require('egg-dao');

const DEFAULT_COLUMNS = ["id", "sellerId", "name", "provinceCode", "cityCode", "districtCode", "address", "creator", "createDt", "modifyer", "modifyDt"];

class WarehouseDao extends Dao {
    static clientName() {
        return 'stock';
    }

    query({
        id,
        sellerId,
        sellerIds,
        keywords,
        pageIndex = 1,
        pageSize = 100
    }) {
        let where = {};

        if (sellerId) {
            where.sellerId = sellerId;
        } else if (Array.isArray(sellerIds) && sellerIds.length) {
            where.sellerId = sellerIds;
        }

        if (id) {
            where.id = id;
        } else if (keywords) {
            where["CONCAT(name,tags,address) like ?"] = `%${keywords}%`;
        }

        return this.connection.selectPage(
            DEFAULT_COLUMNS,
            'warehouse',
            {
                where,
                pageIndex,
                pageSize
            }
        );
    }

    getWarehousesBySellerId(sellerId) {
        return this.connection.select(
            DEFAULT_COLUMNS,
            'warehouse',
            {
                where: {
                    sellerId
                }
            }
        );
    }

    add({
        sellerId,
        name,
        tags,
        provinceCode,
        cityCode,
        districtCode,
        address,
        creator,
    }) {
        return this.connection.insert('warehouse', {
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
    }

    update({
        id,
        sellerId,
        name,
        tags,
        provinceCode,
        cityCode,
        districtCode,
        address
    }) {
        return this.connection.update('warehouse', {
            sellerId,
            name,
            tags,
            provinceCode,
            cityCode,
            districtCode,
            address
        }, {
            id
        });
    }
}

module.exports = WarehouseDao;