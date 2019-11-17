const { Service } = require("egg");

class OrderService extends Service {
    getOrderBySkus(skus) {
        return this.app.tradeRPC.invoke('order.getOrderBySkus', [skus]);
    }

    createOrder(accountId, sellerList, addressId) {
        return this.app.tradeRPC.invoke('order.createOrder', [accountId, sellerList, addressId]);
    }

    getOrderById(accountId, tradeId) {
        return this.app.tradeRPC.invoke('order.getOrderById', [accountId, tradeId]);
    }

    getSellerOrderById(accountId, sellerOrderId) {
        return this.app.tradeRPC.invoke('order.getSellerOrderById', [accountId, sellerOrderId]);
    }

    cancelOrder(accountId, sellerOrderId) {
        return this.app.tradeRPC.invoke('order.cancelOrder', [accountId, sellerOrderId]);
    }

    listOrder(accountId, type, pageIndex, pageSize) {
        return this.app.tradeRPC.invoke('order.listOrder', [accountId, type, pageIndex, pageSize]);
    }

    simulatePay(tradeCode) {
        return this.app.tradeRPC.invoke('order.pay', [tradeCode, 3]);
    }
}

module.exports = OrderService;