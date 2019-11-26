const { Service } = require("egg");

class FdCategoryService extends Service {
    getLevel1Cates(sellerId) {
        return this.app.productRPC.invoke('fdCategory.getLevel1Cates', [sellerId]);
    }

    getSubCatesTreeByPid(pid) {
        return this.app.productRPC.invoke('fdCategory.getSubCatesTreeByPid', [pid]);
    }

    add({ name, sellerId, pid, picture, level, sort, linkType, link, formulaId, creator }) {
        return this.app.productRPC.invoke('fdCategory.add', [{ sellerId, name, pid, level, picture, sort, linkType, link, formulaId, creator }]);
    }

    update({ name, id, sort, picture, linkType, link, formulaId, modifyer }) {
        return this.app.productRPC.invoke('fdCategory.update', [{ name, id, sort, picture, linkType, link, formulaId, modifyer }]);
    }

    deleteById(id) {
        return this.app.productRPC.invoke('fdCategory.deleteById', [id]);
    }
}

module.exports = FdCategoryService;