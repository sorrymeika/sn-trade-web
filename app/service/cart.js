const { Service } = require("egg");

class CartService extends Service {
    countCartTotalNum(userId) {
        return this.ctx.tradeRPC.invoke('cart.countCartTotalNum', [userId]);
    }

    listUserCart(userId) {
        return this.ctx.tradeRPC.invoke('cart.listUserCart', [userId]);
    }

    addSkuToCart(skuId, num, userId, price) {
        return this.ctx.tradeRPC.invoke('cart.addSkuToCart', [skuId, num, userId, price]);
    }

    updateCartNum(accountId, cartId, num) {
        return this.ctx.tradeRPC.invoke('cart.updateCartNum', [accountId, cartId, num]);
    }

    updateCartSelected(accountId, cartId, selected) {
        return this.ctx.tradeRPC.invoke('cart.updateCartSelected', [accountId, cartId, selected]);
    }

    updateSelectedByCartIds(accountId, cartIds, selected) {
        return this.ctx.tradeRPC.invoke('cart.updateSelectedByCartIds', [accountId, cartIds, selected]);
    }

    updateAllSelected(accountId, selected) {
        return this.ctx.tradeRPC.invoke('cart.updateAllSelected', [accountId, selected]);
    }
}

module.exports = CartService;