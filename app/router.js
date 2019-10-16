module.exports = app => {
    const { router, controller } = app;

    /** ********************************************************************
     * 后台接口
     ** ********************************************************************/

    // 系统类目
    router.post('/category/listCateByPid', controller.category.listCateByPid);
    router.post('/category/add', controller.category.addCate);
    router.post('/category/update', controller.category.updateCate);

    router.post('/category/listSpuPropDefinitions', controller.category.listSpuPropDefinitions);
    router.post('/category/addSpuPropDefinition', controller.category.addSpuPropDefinition);
    router.post('/category/updateSpuPropDefinition', controller.category.updateSpuPropDefinition);

    // 品牌
    router.post('/brand/query', controller.brand.queryBrands);
    router.post('/brand/getById', controller.brand.getBrandById);
    router.post('/brand/add', controller.brand.addBrand);
    router.post('/brand/update', controller.brand.updateBrand);

    // 商品
    router.post('/product/listSpuTypes', controller.product.listSpuTypes);
    router.post('/product/getSpusByIds', controller.product.getSpusByIds);
    router.post('/product/listSpu', controller.product.listSpu);

    router.post('/product/getSpuById', controller.product.getSpuById);
    router.post('/product/addSpu', controller.product.addSpu);
    router.post('/product/updateSpu', controller.product.updateSpu);

    router.post('/product/addSku', controller.product.addSku);
    router.post('/product/updateSku', controller.product.updateSku);

    // 选品规则
    router.post('/formula/list', controller.formula.listFormula);
    router.post('/formula/getById', controller.formula.getFormulaById);
    router.post('/formula/add', controller.formula.addFormula);
    router.post('/formula/update', controller.formula.updateFormula);


    /** ********************************************************************
     * 公共接口
     ** ********************************************************************/

    // 商品
    router.post('/product/listAllSkusBySpuId', controller.product.listAllSkusBySpuId);

    // 搜索
    router.post('/search/searchByFormula', controller.search.searchByFormula);


    /** ********************************************************************
     * 前台接口
     ** ********************************************************************/

    // 商品
    router.post('/product/getProductById', controller.product.getProductById);

    // 购物车
    router.post('/cart/listUserCart', controller.cart.listUserCart);
    router.post('/cart/addSkuToCart', controller.cart.addSkuToCart);
    router.post('/cart/updateCartNum', controller.cart.updateCartNum);
    router.post('/cart/updateCartSelected', controller.cart.updateCartSelected);
    router.post('/cart/updateSelectedByCartIds', controller.cart.updateSelectedByCartIds);
    router.post('/cart/updateAllSelected', controller.cart.updateAllSelected);

    // 订单
    router.post('/order/getOrderBySkus', controller.order.getOrderBySkus);
    router.post('/order/createOrder', controller.order.createOrder);
};