const { Service } = require("egg");

class OrderService extends Service {
    getOrderBySkus(skus) {
        return this.ctx.tradeRPC.invoke('order.getOrderBySkus', [skus]);
    }

    createOrder(accountId, sellerList, addressId) {
        return this.ctx.tradeRPC.invoke('order.createOrder', [accountId, sellerList, addressId]);
    }

    getOrderById(accountId, tradeId) {
        return this.ctx.tradeRPC.invoke('order.getOrderById', [accountId, tradeId]);
    }

    cancelOrder(accountId, tradeId) {
        return this.ctx.tradeRPC.invoke('order.cancelOrder', [accountId, tradeId]);
    }

    listOrder(accountId, type, pageIndex, pageSize) {
        return this.ctx.tradeRPC.invoke('order.listOrder', [accountId, type, pageIndex, pageSize]);
    }
}

module.exports = OrderService;