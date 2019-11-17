const { Service } = require("egg");

class SearchService extends Service {
    searchByFormula(formulaId, pageIndex, pageSize) {
        return this.app.productRPC.invoke('search.searchByFormula', [formulaId, pageIndex, pageSize]);
    }
}

module.exports = SearchService;