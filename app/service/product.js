const { Service } = require("egg");

class ProductService extends Service {
    // 后台接口
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

    getSpuById(id) {
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

    addSku({ spuId, code, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }) {
        return this.ctx.productRPC.invoke('product.addSku', [{ spuId, code, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }]);
    }

    updateSku({ id, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }) {
        return this.ctx.productRPC.invoke('product.updateSku', [{ id, price, kgWeight, picture, stockType, stock, skuPropVal0, skuPropVal1, skuPropVal2, skuPropVal3, skuPropVal4 }]);
    }

    // 前台接口
    getProductById(id) {
        return Promise.all([
            this.ctx.productRPC.invoke('product.getBasicById', [id])
                .then((res) => {
                    return Promise.all([
                        this.ctx.sellerRPC.invoke('seller.getSellerInfoById', [res.data.sellerId]),
                        this.ctx.productRPC.invoke('category.listSpuPropDefinitionsWithColumns', [res.data.subSubCateId])
                    ])
                        .then(([seller, spuPropDefinitions]) => {
                            res.seller = seller.data;
                            res.spuPropDefinitions = spuPropDefinitions.data;
                            return res;
                        });
                }),
            this.ctx.productRPC.invoke('product.listAllSkusBySpuId', [id]),
        ])
            .then(([basic, skus]) => {
                let minPrice = skus.data[0].price;
                let maxPrice = skus.data[0].price;

                for (let i = 1; i < skus.data.length; i++) {
                    let sku = skus.data[i];
                    if (sku.price < minPrice) {
                        minPrice = sku.price;
                    }
                    if (sku.price > maxPrice) {
                        maxPrice = sku.price;
                    }
                }

                const spuProps = basic.data.props ? JSON.parse(basic.data.props) : {};

                return {
                    success: true,
                    code: 0,
                    data: {
                        item: Object.assign(basic.data, {
                            price: minPrice,
                            minPrice,
                            maxPrice,
                        }),
                        seller: basic.seller,
                        spuProps: basic.spuPropDefinitions
                            ? basic.spuPropDefinitions.map((prop) => ({
                                ...prop,
                                value: spuProps[prop.field]
                            }))
                            : [],
                        skus: skus.data
                    }
                };
            });
    }

    getDetailById(id) {
        return this.ctx.productRPC.invoke('product.getDetailById', [id]);
    }

    listAllSkusBySpuId(spuId) {
        return this.ctx.productRPC.invoke('product.listAllSkusBySpuId', [spuId]);
    }
}

module.exports = ProductService;