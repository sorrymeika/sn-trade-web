const { Service } = require("egg");

class BrandService extends Service {
    queryBrands({ id, sellerId, name, status, brandType, hasBrandAuth, pageIndex, pageSize }) {
        return this.app.productRPC.invoke('brand.queryBrands', [{ id, sellerId, name, status, brandType, hasBrandAuth, pageIndex, pageSize }]);
    }

    getBrandById(id) {
        return this.app.productRPC.invoke('brand.getBrandById', [id]);
    }

    addBrand(brand) {
        return this.app.productRPC.invoke('brand.addBrand', [brand]);
    }

    updateBrand(brand) {
        return this.app.productRPC.invoke('brand.updateBrand', [brand]);
    }
}

module.exports = BrandService;