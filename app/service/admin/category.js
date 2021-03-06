const { Service } = require("egg");

class CategoryService extends Service {
    listCateByPid(pid) {
        return this.app.productRPC.invoke('category.listCateByPid', [pid]);
    }

    addCate({ name, pid, level, creator }) {
        return this.app.productRPC.invoke('category.addCate', [{ name, pid, level, creator }]);
    }

    updateCate({ name, id, modifyer }) {
        return this.app.productRPC.invoke('category.updateCate', [{ name, id, modifyer }]);
    }

    getSpuPropDefinitions(categoryId) {
        return this.app.productRPC.invoke('category.getSpuPropDefinitions', [categoryId, 'all']);
    }

    addSpuPropDefinition({ categoryId, type, inputType, label, field, rules, inputProps, options }) {
        return this.app.productRPC.invoke('category.addSpuPropDefinition', [{ categoryId, type, inputType, label, field, rules, inputProps, options }]);
    }

    updateSpuPropDefinition({ id, categoryId, type, inputType, label, field, rules, inputProps, options }) {
        return this.app.productRPC.invoke('category.updateSpuPropDefinition', [{ id, categoryId, type, inputType, label, field, rules, inputProps, options }]);
    }
}

module.exports = CategoryService;