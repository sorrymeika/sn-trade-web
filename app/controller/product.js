const { Controller } = require("egg");

class ProductController extends Controller {
    async getProductById() {
        const { ctx } = this;
        const payloadRule = {
            id: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.product.getProductById(ctx.request.body.id);
        ctx.body = res;
    }

    async getDetailById() {
        const { ctx } = this;
        const payloadRule = {
            id: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.product.getDetailById(ctx.request.body.id);
        ctx.body = res;
    }

    async getSpusByIds() {
        const { ctx } = this;
        const payloadRule = {
            spuIds: { type: 'array', required: true, itemType: 'number' },
        };
        ctx.validate(payloadRule);

        const { spuIds } = ctx.request.body;
        if (!spuIds.length) {
            ctx.body = { success: true, data: [] };
        } else {
            const res = await ctx.service.product.getSpusByIds(spuIds);
            ctx.body = res;
        }
    }
}

module.exports = ProductController;
