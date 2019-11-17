const { Service } = require("egg");

class FormulaService extends Service {
    listFormula({ id, sellerId, name, pageIndex, pageSize }) {
        return this.app.productRPC.invoke('formula.listFormula', [{ id, sellerId, name, pageIndex, pageSize }]);
    }

    getFormulaById(id) {
        return this.app.productRPC.invoke('formula.getFormulaById', [id]);
    }

    addFormula({
        name,
        tagIds,
        sellerId,
        cates,
        types,
        keywords,
        brandName,
        minSales,
        maxSales,
        minPrice,
        maxPrice
    }) {
        return this.app.productRPC.invoke('formula.addFormula', [{
            name,
            tagIds,
            sellerId,
            cates,
            types,
            keywords,
            brandName,
            minSales,
            maxSales,
            minPrice,
            maxPrice
        }]);
    }

    updateFormula({
        id,
        name,
        tagIds,
        sellerId,
        cates,
        types,
        keywords,
        brandName,
        minSales,
        maxSales,
        minPrice,
        maxPrice
    }) {
        return this.app.productRPC.invoke('formula.updateFormula', [{
            id,
            name,
            tagIds,
            sellerId,
            cates,
            types,
            keywords,
            brandName,
            minSales,
            maxSales,
            minPrice,
            maxPrice
        }]);
    }
}

module.exports = FormulaService;