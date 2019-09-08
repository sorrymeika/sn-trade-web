module.exports = app => {
    const { router, controller } = app;
    router.post('/category/add', controller.category.addCate);
};