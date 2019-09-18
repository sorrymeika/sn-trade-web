const { Service } = require("egg");

class CategoryService extends Service {
    listCateByPid(pid) {
        return this.ctx.productRPC.invoke('category.listCateByPid', [pid]);
    }

    addCate({ name, pid, level, creator }) {
        return this.ctx.productRPC.invoke('category.addCate', [{ name, pid, level, creator }]);
    }

    updateCate({ name, id, modifyer }) {
        return this.ctx.productRPC.invoke('category.updateCate', [{ name, id, modifyer }]);
    }

    listSpuPropDefinitions(categoryId) {
        return this.ctx.productRPC.invoke('category.listSpuPropDefinitions', [categoryId]);
    }

    addSpuPropDefinition({ categoryId, type, inputType, label, field, rules, inputProps, options }) {
        return this.ctx.productRPC.invoke('category.addSpuPropDefinition', [{ categoryId, type, inputType, label, field, rules, inputProps, options }]);
    }

    updateSpuPropDefinition({ id, categoryId, type, inputType, label, field, rules, inputProps, options }) {
        return this.ctx.productRPC.invoke('category.updateSpuPropDefinition', [{ id, categoryId, type, inputType, label, field, rules, inputProps, options }]);
    }
}

module.exports = CategoryService;