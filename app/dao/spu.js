const { Dao } = require("egg-dao");

const DEFAULT_COLUMNS = ['id'];

class SpuDao extends Dao {
    getItemsByIds(spuIds) {
        this.connection.select(DEFAULT_COLUMNS, 'spu', {
            where: {
                spuId: spuIds
            }
        });
    }
}

module.exports = SpuDao;