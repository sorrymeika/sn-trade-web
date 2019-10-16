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
}

module.exports = SearchController;