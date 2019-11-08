const { Controller } = require("egg");

class OrderController extends Controller {
    async queryOrders() {
        const { ctx } = this;
        const payloadRule = {
            statusType: { type: 'number', required: false },
            pageIndex: { type: 'number', required: true },
            pageSize: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;
        const result = await ctx.service.admin.order.queryOrders(body);
        ctx.body = result;
    }

    async getSellerOrderById() {
        const { ctx } = this;
        const payloadRule = {
            sellerOrderId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const { sellerOrderId } = ctx.request.body;
        const result = await ctx.service.admin.order.getSellerOrderById(sellerOrderId);
        ctx.body = result;
    }

    async batchSendOut() {
        const { ctx } = this;
        const payloadRule = {
            sellerOrderIds: { type: 'array', itemType: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const { sellerOrderIds } = ctx.request.body;
        const result = await ctx.service.admin.order.batchSendOut(sellerOrderIds);
        ctx.body = result;
    }
}

module.exports = OrderController;