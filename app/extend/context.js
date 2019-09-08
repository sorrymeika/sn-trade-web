const { registerConsumer } = require('sonorpc');

const productRPC = registerConsumer({
    // 服务提供者名称
    providerName: 'product',
    registry: {
        port: 3006
    }
});

module.exports = {
    get productRPC() {
        // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
        return productRPC;
    },
};