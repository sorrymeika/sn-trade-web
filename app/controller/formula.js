const { Controller } = require("egg");

class FormulaController extends Controller {
    async listFormula() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: false },
            name: { type: 'string', required: false },
            sellerId: { type: 'number', required: false },
            pageIndex: { type: 'number', required: true },
            pageSize: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            id,
            sellerId,
            name,
            pageIndex,
            pageSize
        } = body;

        const result = await ctx.service.formula.listFormula({
            id,
            sellerId,
            name,
            pageIndex,
            pageSize
        });
        ctx.body = result;
    }

    async getFormulaById() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            id
        } = body;

        const result = await ctx.service.formula.getFormulaById({
            id
        });
        ctx.body = result;
    }

    async addFormula() {
        const { ctx } = this;

        const payloadRule = {
            name: { type: 'string', required: true },
            tagIds: { type: 'string', required: false, format: /^\d+(,\d+)*$/ },
            sellerId: { type: 'number', required: false },
            cates: { type: 'string', required: false, format: /^\d+-\d+-\d+(-\d+)?(,\d+-\d+-\d+(-\d+)?)*$/ },
            types: { type: 'string', required: false, format: /^\d+-\d+(-\d+)?(,\d+-\d+(-\d+)?)*$/ },
            keywords: { type: 'string', required: false },
            brandName: { type: 'string', required: false },
            minSales: { type: 'number', required: false },
            maxSales: { type: 'number', required: false },
            minPrice: { type: 'number', required: false },
            maxPrice: { type: 'number', required: false }
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const result = await ctx.service.formula.addFormula(body);
        ctx.body = result;
    }

    async updateFormula() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: false },
            name: { type: 'string', required: true },
            tagIds: { type: 'string', required: false, format: /^\d+(,\d+)*$/ },
            sellerId: { type: 'number', required: false },
            cates: { type: 'string', required: false, format: /^\d+-\d+-\d+(-\d+)?(,\d+-\d+-\d+(-\d+)?)*$/ },
            types: { type: 'string', required: false, format: /^\d+-\d+(-\d+)?(,\d+-\d+(-\d+)?)*$/ },
            keywords: { type: 'string', required: false },
            brandName: { type: 'string', required: false },
            minSales: { type: 'number', required: false },
            maxSales: { type: 'number', required: false },
            minPrice: { type: 'number', required: false },
            maxPrice: { type: 'number', required: false }
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const result = await ctx.service.formula.addFormula(body);
        ctx.body = result;
    }
}

module.exports = FormulaController;