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

    getSpusByIds(spuIds) {
        return this.app.productRPC.invoke('product.getSpusByIds', [spuIds]);
    }

    async getSkusBySpuId() {
        const { ctx } = this;

        const payloadRule = {
            spuId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.product.getSkusBySpuId(ctx.request.body.spuId);
        ctx.body = res;
    }
}

module.exports = ProductController;
