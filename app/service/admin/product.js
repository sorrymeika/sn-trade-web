const { Service } = require("egg");

class ProductService extends Service {
    listSpuTypes() {
        return this.app.productRPC.invoke('product.listSpuTypes');
    }

    getSpusByIds(spuIds) {
        return this.app.productRPC.invoke('product.getSpusByIds', [spuIds]);
    }

    listSpu({
        spuId,
        title,
        status,
        type,
        subType,
        cateId,
        subCateId,
        subSubCateId,
        approvalStatus,
        brandId,
        pageIndex,
        pageSize
    }) {
        return this.app.productRPC.invoke('product.listSpu', [{
            spuId,
            title,
            status,
            type,
            subType,
            cateId,
            subCateId,
            subSubCateId,
            approvalStatus,
            brandId,
            pageIndex,
            pageSize
        }]);
    }

    getSpuById(id) {
        return this.app.productRPC.invoke('product.getSpuById', [id]);
    }

    addSpu({
        title,
        cateId,
        subCateId,
        subSubCateId,
        type,
        subType,
        sellerId,
        creator,
        subtitle,
        brandId,
        barcode,
        company,
        pictures,
        video,
        specOnTitle,
        minBuyNum,
        maxBuyNum,
        skuPropKey0,
        skuPropKey1,
        skuPropKey2,
        skuPropKey3,
        skuPropKey4
    }) {
        return this.app.productRPC.invoke('product.addSpu', [{
            title,
            cateId,
            subCateId,
            subSubCateId,
            type,
            subType,
            sellerId,
            creator,
            subtitle,
            brandId,
            barcode,
            company,
            pictures,
            video,
            specOnTitle,
            minBuyNum,
            maxBuyNum,
            skuPropKey0,
            skuPropKey1,
            skuPropKey2,
            skuPropKey3,
            skuPropKey4
        }]);
    }

    updateSpu({
        id,
        title,
        sellerId,
        modifyer,
        subtitle,
        brandId,
        barcode,
        company,
        pictures,
        video,
        specOnTitle,
        minBuyNum,
        maxBuyNum,
        skuPropKey0,
        skuPropKey1,
        skuPropKey2,
        skuPropKey3,
        skuPropKey4,
        props,
        detailVideo,
        content
    }) {
        return this.app.productRPC.invoke('product.updateSpu', [{
            id,
            title,
            sellerId,
            modifyer,
            subtitle,
            brandId,
            barcode,
            company,
            pictures,
            video,
            specOnTitle,
            minBuyNum,
            maxBuyNum,
            skuPropKey0,
            skuPropKey1,
            skuPropKey2,
            skuPropKey3,
            skuPropKey4,
            props,
            detailVideo,
            content
        }]);
    }

    /**
     * 商品上架
     * @param {number} spuId 商品ID
     */
    shelveSpu(spuId) {
        return this.app.productRPC.invoke('product.shelveSpu', [spuId]);
    }

    /**
     * 商品下架
     * @param {*} spuId 商品ID
     */
    pullSpuFromShelves(spuId) {
        return this.app.productRPC.invoke('product.pullSpuFromShelves', [spuId]);
    }

    getSkusBySpuId(spuId) {
        return this.app.productRPC.invoke('product.getSkusBySpuId', [spuId]);
    }

    /**
     * 添加SKU
     * @param {*} sku SKU信息
     */
    addSku({ spuId, code, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }) {
        return this.app.productRPC.invoke('product.addSku', [{ spuId, code, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }]);
    }

    updateSku({ id, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }) {
        return this.app.productRPC.invoke('product.updateSku', [{ id, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }]);
    }

    /**
     * SKU上架
     * @param {number} skuId 商品ID
     */
    shelveSku(skuId) {
        return this.app.productRPC.invoke('product.shelveSku', [skuId]);
    }

    /**
     * SKU下架
     * @param {*} skuId 商品ID
     */
    pullSkuFromShelves(skuId) {
        return this.app.productRPC.invoke('product.pullSkuFromShelves', [skuId]);
    }
}

module.exports = ProductService;