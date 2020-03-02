const { Service } = require("egg");

class FdCategoryService extends Service {
    async getCates(sellerId) {
        const cateRes = await this.app.productRPC.invoke('fdCategory.getCatesBySellerId', [sellerId]);
        if (cateRes.success && cateRes.data && cateRes.data.length) {
            const subCatesRes = await this.getSubCatesTreeByPid(cateRes.data[0].id);
            if (subCatesRes.success) {
                cateRes.data[0].children = subCatesRes.data;
            }
        }
        return cateRes;
    }

    getSubCatesTreeByPid(pid) {
        return this.app.productRPC.invoke('fdCategory.getSubCatesTreeByPid', [pid]);
    }
}

module.exports = FdCategoryService;