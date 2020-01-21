const { Service } = require('egg');

module.exports = class StockInService extends Service {
    /**
     * 添加入库单
     *
     * @param {data.type} 入库类型: enum { 1: '进货', 2: '退货入库' }
     * @returns
     */
    async add({
        sellerId,
        warehouseType,
        warehouseId,
        note,
        type,
        refundId,
        details
    }) {
        const auth = await this.ctx.getAuth();

        return await this.app.mysql.get('stock')
            .beginTransactionScope(async (conn) => {
                const stockInDao = this.ctx.dao.stockIn(conn);
                const res = await stockInDao.addStockIn({
                    sellerId,
                    warehouseType,
                    warehouseId,
                    note,
                    type,
                    refundId,
                    creator: auth.account.name,
                });
                const stockInDetails = details.map((detail) => {
                    return {
                        ...detail,
                        status: 1,
                        // 库存明细类型: { 1: '进货入库', 2: '出库', 3: '退货入库', 4: '库存修正' }
                        type: type == 1 ? 1 : 3,
                        relId: res.id
                    };
                });
                await stockInDao.addStockInDetails(stockInDetails);

                return { success: true, data: res };
            }, this.ctx);
    }

    query() {
    }

    update() {
    }

    getById() {
    }
};
