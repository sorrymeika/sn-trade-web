const { Dao } = require('egg-dao');

class OrderDao extends Dao {
    static clientName() {
        return 'trade';
    }
}

module.exports = OrderDao;
