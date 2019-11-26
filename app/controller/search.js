const { Controller } = require("egg");

class SearchController extends Controller {
    async searchByFormula() {
        const { ctx } = this;

        const payloadRule = {
            formulaId: { type: 'number', required: true },
            pageIndex: { type: 'number', required: true },
            pageSize: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            formulaId,
            pageIndex,
            pageSize
        } = body;

        const result = await ctx.service.search.searchByFormula(formulaId, pageIndex, pageSize);
        ctx.body = result;
    }

    async searchByConditions() {
        const { ctx } = this;

        const payloadRule = {
            keywords: { type: 'string', required: false },
            sellerIds: { type: 'array', itemType: 'number', required: false },
            types: {
                type: 'array', required: false, itemType: 'object',
                rule: {
                    type: { type: 'number', required: false },
                    subType: { type: 'number', required: false }
                }
            },
            cates: {
                type: 'array',
                required: false,
                itemType: 'object',
                rule: {
                    cateId: { type: 'number', required: false },
                    subCateId: { type: 'number', required: false },
                    subSubCateId: { type: 'number', required: false }
                }
            },
            brandName: { type: 'string', required: false },
            minSales: { type: 'number', required: false },
            maxSales: { type: 'number', required: false },
            minPrice: { type: 'number', required: false },
            maxPrice: { type: 'number', required: false },
            orderBy: { type: 'number', required: false },
            pageIndex: { type: 'number', required: true },
            pageSize: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            keywords,
            sellerIds,
            types,
            cates,
            brandName,
            minSales,
            maxSales,
            minPrice,
            maxPrice,
            orderBy,
            pageIndex,
            pageSize
        } = body;

        const result = await ctx.service.search.searchByConditions({
            keywords,
            sellerIds,
            types,
            cates,
            brandName,
            minSales,
            maxSales,
            minPrice,
            maxPrice,
            orderBy,
            pageIndex,
            pageSize
        });
        ctx.body = result;
    }
}

module.exports = SearchController;