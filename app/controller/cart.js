const { Controller } = require("egg");
const { NO_PERMISSION } = require("../constants/error");

class CartController extends Controller {
    async listUserCart() {
        const { ctx } = this;

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const result = await ctx.service.cart.listUserCart(ctx.accountId);
        ctx.body = result;
    }

    async addSkuToCart() {
        const { ctx } = this;

        const payloadRule = {
            skuId: { type: 'number', required: true },
            num: { type: 'number', required: true },
            price: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;

        const {
            skuId,
            num,
            price
        } = body;

        const result = await ctx.service.cart.addSkuToCart(skuId, num, ctx.accountId, price);
        ctx.body = result;
    }

    async updateCartNum() {
        const { ctx } = this;

        const payloadRule = {
            cartId: { type: 'number', required: true },
            num: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;

        const {
            cartId,
            num,
        } = body;

        const result = await ctx.service.cart.updateCartNum(ctx.accountId, cartId, num);
        if (result.success) {
            ctx.body = await ctx.service.cart.listUserCart(ctx.accountId);
        } else {
            ctx.body = result;
        }
    }

    async updateCartSelected() {
        const { ctx } = this;

        const payloadRule = {
            cartId: { type: 'number', required: true },
            selected: { type: 'boolean', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;

        const {
            cartId,
            selected,
        } = body;

        const result = await ctx.service.cart.updateCartSelected(ctx.accountId, cartId, selected);
        if (result.success) {
            ctx.body = await ctx.service.cart.listUserCart(ctx.accountId);
        } else {
            ctx.body = result;
        }
    }

    async updateSelectedByCartIds() {
        const { ctx } = this;

        const payloadRule = {
            cartIds: { type: 'array', required: true, itemType: 'number' },
            selected: { type: 'boolean', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;

        const {
            cartIds,
            selected,
        } = body;

        const result = await ctx.service.cart.updateSelectedByCartIds(ctx.accountId, cartIds, selected);
        if (result.success) {
            ctx.body = await ctx.service.cart.listUserCart(ctx.accountId);
        } else {
            ctx.body = result;
        }
    }

    async updateAllSelected() {
        const { ctx } = this;

        const payloadRule = {
            selected: { type: 'boolean', required: true },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = { ...NO_PERMISSION, message: '请先登录！' };
            return;
        }

        const body = ctx.request.body;

        const {
            selected,
        } = body;

        const result = await ctx.service.cart.updateAllSelected(ctx.accountId, selected);
        if (result.success) {
            ctx.body = await ctx.service.cart.listUserCart(ctx.accountId);
        } else {
            ctx.body = result;
        }
    }
}

module.exports = CartController;