module.exports = app => {
    const { router, controller } = app;
    router.post('/category/listCateByPid', controller.category.listCateByPid);
    router.post('/category/add', controller.category.addCate);
    router.post('/category/update', controller.category.updateCate);

    router.post('/category/listSpuPropDefinitions', controller.category.listSpuPropDefinitions);
    router.post('/category/addSpuPropDefinition', controller.category.addSpuPropDefinition);
    router.post('/category/updateSpuPropDefinition', controller.category.updateSpuPropDefinition);

    router.post('/brand/query', controller.brand.queryBrands);
    router.post('/brand/getById', controller.brand.getBrandById);
    router.post('/brand/add', controller.brand.addBrand);
    router.post('/brand/update', controller.brand.updateBrand);

    router.post('/product/listSpuTypes', controller.product.listSpuTypes);
    router.post('/product/getSpusByIds', controller.product.getSpusByIds);
    router.post('/product/listSpu', controller.product.listSpu);

    router.post('/product/getSpuById', controller.product.getSpuById);
    router.post('/product/addSpu', controller.product.addSpu);
    router.post('/product/updateSpu', controller.product.updateSpu);

    router.post('/product/listAllSkusBySpuId', controller.product.listAllSkusBySpuId);
    router.post('/product/addSku', controller.product.addSku);
    router.post('/product/updateSku', controller.product.updateSku);

    router.post('/formula/list', controller.formula.listFormula);
    router.post('/formula/getById', controller.formula.getFormulaById);
    router.post('/formula/add', controller.formula.addFormula);
    router.post('/formula/update', controller.formula.updateFormula);
};