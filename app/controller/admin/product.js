const { Controller } = require("egg");

class ProductController extends Controller {
    async listSpuTypes() {
        const { ctx } = this;
        const res = await ctx.service.admin.product.listSpuTypes();

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
            const res = await ctx.service.admin.product.getSpusByIds(spuIds);
            ctx.body = res;
        }
    }

    async listSpu() {
        const { ctx } = this;
        const payloadRule = {
            spuId: { type: 'number', required: false },
            title: { type: 'string', required: false },
            status: { type: 'number', required: false },
            type: { type: 'number', required: false },
            subType: { type: 'number', required: false },
            cateId: { type: 'number', required: false },
            subCateId: { type: 'number', required: false },
            subSubCateId: { type: 'number', required: false },
            approvalStatus: { type: 'number', required: false },
            brandId: { type: 'number', required: false },
            pageIndex: { type: 'number', required: true },
            pageSize: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.listSpu(ctx.request.body);
        ctx.body = res;
    }

    async getSpuById() {
        const { ctx } = this;
        const payloadRule = {
            id: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.getSpuById(ctx.request.body.id);
        ctx.body = res;
    }

    async addSpu() {
        const { ctx } = this;

        const payloadRule = {
            title: { type: 'string', required: true },
            cateId: { type: 'number', required: true },
            subCateId: { type: 'number', required: true },
            subSubCateId: { type: 'number', required: true },
            type: { type: 'number', required: true },
            subType: { type: 'number', required: true },
            sellerId: { type: 'number', required: true },
            subtitle: { type: 'string', required: false },
            brandId: { type: 'number', required: true },
            barcode: { type: 'string', required: false },
            company: { type: 'string', required: true },
            pictures: { type: 'string', required: true },
            video: { type: 'string', required: false },
            specOnTitle: { type: 'string', required: false },
            minBuyNum: { type: 'number', required: true, min: 1 },
            maxBuyNum: { type: 'number', required: true, max: 999999 },
            skuPropKey0: { type: 'string', required: false },
            skuPropKey1: { type: 'string', required: false },
            skuPropKey2: { type: 'string', required: false },
            skuPropKey3: { type: 'string', required: false },
            skuPropKey4: { type: 'string', required: false },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.addSpu(ctx.request.body);
        ctx.body = res;
    }

    async updateSpu() {
        const { ctx } = this;

        const payloadRule = {
            title: { type: 'string', required: true },
            sellerId: { type: 'number', required: true },
            subtitle: { type: 'string', required: false },
            brandId: { type: 'number', required: true },
            barcode: { type: 'string', required: false },
            company: { type: 'string', required: true },
            pictures: { type: 'string', required: true },
            video: { type: 'string', required: false },
            specOnTitle: { type: 'string', required: false },
            minBuyNum: { type: 'number', required: true, min: 1 },
            maxBuyNum: { type: 'number', required: true, max: 999999 },
            skuPropKey0: { type: 'string', required: false },
            skuPropKey1: { type: 'string', required: false },
            skuPropKey2: { type: 'string', required: false },
            skuPropKey3: { type: 'string', required: false },
            skuPropKey4: { type: 'string', required: false },
            props: { type: 'jsonString', required: false },
            detailVideo: { type: 'string', required: false },
            content: { type: 'string', required: false },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.updateSpu(ctx.request.body);
        ctx.body = res;
    }

    async shelveSpu() {
        const { ctx } = this;
        const payloadRule = {
            spuId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.shelveSpu(ctx.request.body.spuId);
        ctx.body = res;
    }

    async pullSpuFromShelves() {
        const { ctx } = this;
        const payloadRule = {
            spuId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.pullSpuFromShelves(ctx.request.body.spuId);
        ctx.body = res;
    }

    async getSkusBySpuId() {
        const { ctx } = this;

        const payloadRule = {
            spuId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.getSkusBySpuId(ctx.request.body.spuId);
        ctx.body = res;
    }

    async addSku() {
        const { ctx } = this;

        const payloadRule = {
            spuId: { type: 'number', required: true },
            code: { type: 'string', required: true },
            price: { type: 'number', required: true },
            kgWeight: { type: 'number', required: true },
            picture: { type: 'string', required: true },
            stockType: { type: 'number', required: true },
            stock: { type: 'number', required: false },
            skuPropVal0: { type: 'string', required: false },
            skuPropVal1: { type: 'string', required: false },
            skuPropVal2: { type: 'string', required: false },
            skuPropVal3: { type: 'string', required: false },
            skuPropVal4: { type: 'string', required: false }
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.addSku(ctx.request.body);
        ctx.body = res;
    }

    async updateSku() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: true },
            code: { type: 'string', required: true },
            price: { type: 'number', required: true },
            kgWeight: { type: 'number', required: true },
            picture: { type: 'string', required: true },
            stockType: { type: 'number', required: true },
            stock: { type: 'number', required: false },
            skuPropVal0: { type: 'string', required: false },
            skuPropVal1: { type: 'string', required: false },
            skuPropVal2: { type: 'string', required: false },
            skuPropVal3: { type: 'string', required: false },
            skuPropVal4: { type: 'string', required: false }
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.updateSku(ctx.request.body);
        ctx.body = res;
    }

    async shelveSku() {
        const { ctx } = this;
        const payloadRule = {
            spuId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.shelveSku(ctx.request.body.spuId);
        ctx.body = res;
    }

    async pullSkuFromShelves() {
        const { ctx } = this;
        const payloadRule = {
            skuId: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const res = await ctx.service.admin.product.pullSkuFromShelves(ctx.request.body.skuId);
        ctx.body = res;
    }
}

module.exports = ProductController;
