module.exports = [
    /**
     * 后台权限
     */
    {
        url: '/category/add',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/category/update',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/category/addSpuPropDefinition',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/category/updateSpuPropDefinition',
        apps: [1, 2],
        permissionIds: []
    },

    {
        url: '/brand/query',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/brand/getById',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/brand/add',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/brand/update',
        apps: [1, 2],
        permissionIds: []
    },

    {
        url: '/product/listSpuTypes',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/product/listSpu',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/product/getSpuById',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/product/addSpu',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/product/updateSpu',
        apps: [1, 2],
        permissionIds: []
    },

    {
        url: '/product/listAllSkusBySpuId',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/product/addSku',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/product/updateSku',
        apps: [1, 2],
        permissionIds: []
    },

    {
        url: '/formula/update',
        apps: [1, 2],
        permissionIds: []
    }, {
        url: '/formula/add',
        apps: [1, 2],
        permissionIds: []
    },

    /**
     * 前台权限
     */

    // 购物车权限
    {
        url: '/cart/addSkuToCart',
        apps: [3]
    }, {
        url: '/cart/listUserCart',
        apps: [3]
    }, {
        url: '/cart/updateCartNum',
        apps: [3]
    }, {
        url: '/cart/updateCartSelected',
        apps: [3]
    }, {
        url: '/cart/updateSelectedByCartIds',
        apps: [3]
    }, {
        url: '/cart/updateAllSelected',
        apps: [3]
    },

    // 订单权限
    {
        url: '/order/getOrderBySkus',
        apps: [3]
    }, {
        url: '/order/createOrder',
        apps: [3]
    }
];