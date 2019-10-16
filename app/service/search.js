const { Service } = require("egg");

class SearchService extends Service {
    searchByFormula(formulaId, pageIndex, pageSize) {
        return this.ctx.productRPC.invoke('search.searchByFormula', [formulaId, pageIndex, pageSize]);
    }
}

module.exports = SearchService;