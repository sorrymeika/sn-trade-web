const { Controller } = require("egg");
const { NO_PERMISSION } = require("../constants/error");

class OrderController extends Controller {
    async listOrder() {
        const { ctx } = this;
        const payloadRule = {
            type: { type: 'number', required: true },
            pageIndex: { type: 'number', required: true },
            pageSize: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;
        const { type, pageIndex, pageSize } = body;

        const result = await ctx.service.order.listOrder(ctx.accountId, type, pageIndex, pageSize);
        ctx.body = result;
    }

    async getOrderById() {
        const { ctx } = this;
        const payloadRule = {
            orderId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;
        const { orderId } = body;

        const result = await ctx.service.order.getOrderById(ctx.accountId, orderId);
        ctx.body = result;
    }

    async getSellerOrderById() {
        const { ctx } = this;
        const payloadRule = {
            sellerOrderId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;
        const { sellerOrderId } = body;

        const result = await ctx.service.order.getSellerOrderById(ctx.accountId, sellerOrderId);
        ctx.body = result;
    }

    async getOrderBySkus() {
        const { ctx } = this;

        const payloadRule = {
            skus: {
                type: 'array',
                required: true,
                itemType: 'object',
                rule: {
                    skuId: { type: 'number', required: true },
                    num: { type: 'number', required: true },
                    cartId: { type: 'number', required: false },
                }
            },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;
        const { skus } = body;

        const result = await ctx.service.order.getOrderBySkus(skus);
        ctx.body = result;
    }

    async createOrder() {
        const { ctx } = this;

        const payloadRule = {
            sellerList: {
                type: 'array',
                required: true,
                itemType: 'object',
                rule: {
                    id: { type: 'number', required: true },
                    note: { type: 'string', required: false },
                    invoice: {
                        type: 'object',
                        required: true,
                        rule: {
                            type: { type: 'number', required: true },
                            titleType: { type: 'number', required: false },
                            title: { type: 'string', required: false },
                            taxCode: { type: 'string', required: false },
                        }
                    },
                    skus: {
                        type: 'array',
                        required: true,
                        itemType: 'object',
                        rule: {
                            skuId: { type: 'number', required: true },
                            num: { type: 'number', required: true },
                            cartId: { type: 'number', required: false },
                        }
                    }
                }
            },
            addressId: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;
        const { sellerList, addressId } = body;

        const result = await ctx.service.order.createOrder(ctx.accountId, sellerList, addressId);
        ctx.body = result;
    }

    async cancelOrder() {
        const { ctx } = this;
        const payloadRule = {
            sellerOrderId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;
        const { sellerOrderId } = body;

        const result = await ctx.service.order.cancelOrder(ctx.accountId, sellerOrderId);
        ctx.body = result;
    }

    async simulatePay() {
        const { ctx } = this;
        const payloadRule = {
            tradeCode: { type: 'string', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;
        const { tradeCode } = body;

        const result = await ctx.service.order.simulatePay(tradeCode);
        ctx.body = result;
    }
}

module.exports = OrderController;