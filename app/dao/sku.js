const { Dao } = require("egg-dao");

const DEFAULT_COLUMNS = ['id', 'spuId', 'code', 'price', 'kgWeight', 'picture', 'stockType', 'skuPropVal0', 'skuPropVal1', 'skuPropVal2', 'skuPropVal3', 'skuPropVal4'];

class SkuDao extends Dao {
    query({ skuId }) {
        this.connection.select(DEFAULT_COLUMNS, 'sku');
    }

    getById(skuId) {
    }
}

module.exports = SkuDao;