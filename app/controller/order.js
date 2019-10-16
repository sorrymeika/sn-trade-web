const { Controller } = require("egg");
const { NO_PERMISSION } = require("../constants/error");

class OrderController extends Controller {
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
}

module.exports = OrderController;