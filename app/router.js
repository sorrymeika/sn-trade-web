module.exports = app => {
    const { router, controller } = app;

    router.all('/test', controller.test.info);


    /** ********************************************************************
     * 后台接口
     ** ********************************************************************/

    // 系统类目
    router.post('/admin/category/listCateByPid', controller.admin.category.listCateByPid);
    router.post('/admin/category/add', controller.admin.category.addCate);
    router.post('/admin/category/update', controller.admin.category.updateCate);

    router.post('/admin/category/getSpuPropDefinitions', controller.admin.category.getSpuPropDefinitions);
    router.post('/admin/category/addSpuPropDefinition', controller.admin.category.addSpuPropDefinition);
    router.post('/admin/category/updateSpuPropDefinition', controller.admin.category.updateSpuPropDefinition);

    // 品牌
    router.post('/brand/query', controller.brand.queryBrands);
    router.post('/brand/getById', controller.brand.getBrandById);
    router.post('/brand/add', controller.brand.addBrand);
    router.post('/brand/update', controller.brand.updateBrand);

    // 商品
    router.post('/admin/product/listSpuTypes', controller.admin.product.listSpuTypes);
    router.post('/admin/product/listSpu', controller.admin.product.listSpu);
    router.post('/admin/product/getSpusByIds', controller.product.getSpusByIds);
    router.post('/admin/product/getSpuById', controller.admin.product.getSpuById);

    router.post('/admin/product/addSpu', controller.admin.product.addSpu);
    router.post('/admin/product/updateSpu', controller.admin.product.updateSpu);
    router.post('/admin/product/shelveSpu', controller.admin.product.shelveSpu);
    router.post('/admin/product/pullSpuFromShelves', controller.admin.product.pullSpuFromShelves);

    router.post('/admin/product/getSkusBySpuId', controller.admin.product.getSkusBySpuId);
    router.post('/admin/product/addSku', controller.admin.product.addSku);
    router.post('/admin/product/updateSku', controller.admin.product.updateSku);
    router.post('/admin/product/shelveSku', controller.admin.product.shelveSku);
    router.post('/admin/product/pullSkuFromShelves', controller.admin.product.pullSkuFromShelves);


    // 选品规则
    router.post('/formula/list', controller.formula.listFormula);
    router.post('/formula/getById', controller.formula.getFormulaById);
    router.post('/formula/add', controller.formula.addFormula);
    router.post('/formula/update', controller.formula.updateFormula);

    // 订单管理
    router.post('/admin/order/queryOrders', controller.admin.order.queryOrders);
    router.post('/admin/order/getSellerOrderById', controller.admin.order.getSellerOrderById);
    router.post('/admin/order/batchSendOut', controller.admin.order.batchSendOut);

    // 仓库管理
    router.post('/admin/warehouse/queryWarehouses', controller.admin.warehouse.queryWarehouses);
    router.post('/admin/warehouse/add', controller.admin.warehouse.addWarehouse);
    router.post('/admin/warehouse/getById', controller.admin.warehouse.getWarehouseById);
    router.post('/admin/warehouse/update', controller.admin.warehouse.updateWarehouse);

    /** ********************************************************************
     * 公共接口
     ** ********************************************************************/

    // 搜索
    router.post('/search/searchByFormula', controller.search.searchByFormula);


    /** ********************************************************************
     * 前台接口
     ** ********************************************************************/

    // 商品
    router.post('/product/getProductById', controller.product.getProductById);
    router.post('/product/getDetailById', controller.product.getDetailById);
    router.post('/product/getSpusByIds', controller.product.getSpusByIds);


    // 购物车
    router.post('/cart/countCartTotalNum', controller.cart.countCartTotalNum);
    router.post('/cart/listUserCart', controller.cart.listUserCart);
    router.post('/cart/addSkuToCart', controller.cart.addSkuToCart);
    router.post('/cart/updateCartNum', controller.cart.updateCartNum);
    router.post('/cart/updateCartSelected', controller.cart.updateCartSelected);
    router.post('/cart/updateSelectedByCartIds', controller.cart.updateSelectedByCartIds);
    router.post('/cart/updateAllSelected', controller.cart.updateAllSelected);

    // 订单
    router.post('/order/getOrderBySkus', controller.order.getOrderBySkus);
    router.post('/order/listOrder', controller.order.listOrder);
    router.post('/order/getOrderById', controller.order.getOrderById);
    router.post('/order/getSellerOrderById', controller.order.getSellerOrderById);
    router.post('/order/createOrder', controller.order.createOrder);
    router.post('/order/cancelOrder', controller.order.cancelOrder);
    router.post('/order/simulatePay', controller.order.simulatePay);
};