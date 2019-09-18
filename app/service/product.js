const { Service } = require("egg");

class ProductService extends Service {
    listSpuTypes() {
        return this.ctx.productRPC.invoke('product.listSpuTypes');
    }

    getSpusByIds(spuIds) {
        return this.ctx.productRPC.invoke('product.getSpusByIds', [spuIds]);
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
        return this.ctx.productRPC.invoke('product.listSpu', [{
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

    async getSpuById(id) {
        return this.ctx.productRPC.invoke('product.getSpuById', [id]);
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
        return this.ctx.productRPC.invoke('product.addSpu', [{
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
        return this.ctx.productRPC.invoke('product.updateSpu', [{
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

    listAllSkusBySpuId(spuId) {
        return this.ctx.productRPC.invoke('product.listAllSkusBySpuId', [spuId]);
    }

    addSku({ spuId, code, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }) {
        return this.ctx.productRPC.invoke('product.addSku', [{ spuId, code, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }]);
    }

    updateSku({ id, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }) {
        return this.ctx.productRPC.invoke('product.updateSku', [{ id, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }]);
    }
}

module.exports = ProductService;