const { Service } = require('egg');

module.exports = class StockInService extends Service {
    async query({ sellerId, ...params }) {
        if (sellerId && await this.ctx.helper.validateMySeller(sellerId)) {
            params.sellerId = sellerId;
        } else {
            params.sellerId = await this.ctx.helper.getMySellerIds();
        }
        const data = await this.ctx.dao.stockIn.query(params);
        return { success: true, data };
    }

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
        await this.ctx.helper.validateMySeller(sellerId);

        const auth = await this.ctx.getAuth();

        return this.ctx.dao.stockIn.useTransaction(async (stockInDao) => {
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
        });
    }

    update() {
    }

    getById() {
    }
};
