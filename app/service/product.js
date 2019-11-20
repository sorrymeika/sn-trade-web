const { Service } = require("egg");

class ProductService extends Service {
    getProductById(id) {
        return Promise.all([
            this._getBasicInfoById(id),
            this.app.productRPC.invoke('product.getSkusBySpuId', [id]),
        ])
            .then(([basicInfo, skus]) => {
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

                const spuProps = basicInfo.data.props ? JSON.parse(basicInfo.data.props) : {};

                return {
                    success: true,
                    code: 0,
                    data: {
                        item: Object.assign(basicInfo.data, {
                            price: minPrice,
                            minPrice,
                            maxPrice,
                        }),
                        seller: basicInfo.seller,
                        spuProps: basicInfo.spuPropDefinitions
                            ? basicInfo.spuPropDefinitions.map((prop) => ({
                                ...prop,
                                value: spuProps[prop.field]
                            }))
                            : [],
                        skus: skus.data
                    }
                };
            });
    }

    _getBasicInfoById(id) {
        return this.app.productRPC.invoke('product.getBasicInfoById', [id])
            .then((res) => {
                return Promise.all([
                    this.app.sellerRPC.invoke('seller.getSellerInfoById', [res.data.sellerId]),
                    this.app.productRPC.invoke('category.getSpuPropDefinitions', [res.data.subSubCateId, 'least'])
                ])
                    .then(([seller, spuPropDefinitions]) => {
                        res.seller = seller.data;
                        res.spuPropDefinitions = spuPropDefinitions.data;
                        return res;
                    });
            });
    }

    getDetailById(id) {
        return this.app.productRPC.invoke('product.getDetailById', [id]);
    }

    getSpusByIds(spuIds) {
        return this.app.productRPC.invoke('product.getSpusByIds', [spuIds]);
    }

    getSkusBySpuId(spuId) {
        return this.app.productRPC.invoke('product.getSkusBySpuId', [spuId]);
    }
}

module.exports = ProductService;