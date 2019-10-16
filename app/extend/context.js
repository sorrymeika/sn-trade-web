const { registerConsumer } = require('sonorpc');

const productRPC = registerConsumer({
    // 服务提供者名称
    providerName: 'product',
    registry: {
        port: 3006
    }
});

const sellerRPC = registerConsumer({
    // 服务提供者名称
    providerName: 'seller',
    registry: {
        port: 3006
    }
});

const tradeRPC = registerConsumer({
    // 服务提供者名称
    providerName: 'trade',
    registry: {
        port: 3006
    }
});

module.exports = {
    get productRPC() {
        return productRPC;
    },

    get sellerRPC() {
        return sellerRPC;
    },

    get tradeRPC() {
        return tradeRPC;
    },
};