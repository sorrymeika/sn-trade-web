const { Service } = require("egg");

class OrderService extends Service {
    getOrderBySkus(skus) {
        return this.ctx.tradeRPC.invoke('order.getOrderBySkus', [skus]);
    }

    createOrder(accountId, sellerList, addressId) {
        return this.ctx.tradeRPC.invoke('order.createOrder', [accountId, sellerList, addressId]);
    }
}

module.exports = OrderService;