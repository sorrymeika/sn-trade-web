const { Service } = require("egg");

class CategoryService extends Service {
    addCate({ name, pid, level, creator }) {
        return this.ctx.productRPC.invoke('category.addCate', [{ name, pid, level, creator }]);
    }
}

module.exports = CategoryService;