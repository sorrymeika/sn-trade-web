const { Service } = require("egg");

class CartService extends Service {
    countCartTotalNum(userId) {
        return this.app.tradeRPC.invoke('cart.countCartTotalNum', [userId]);
    }

    listUserCart(userId) {
        return this.app.tradeRPC.invoke('cart.listUserCart', [userId]);
    }

    addSkuToCart(skuId, num, userId, price) {
        return this.app.tradeRPC.invoke('cart.addSkuToCart', [skuId, num, userId, price]);
    }

    updateCartNum(accountId, cartId, num) {
        return this.app.tradeRPC.invoke('cart.updateCartNum', [accountId, cartId, num]);
    }

    updateCartSelected(accountId, cartId, selected) {
        return this.app.tradeRPC.invoke('cart.updateCartSelected', [accountId, cartId, selected]);
    }

    updateSelectedByCartIds(accountId, cartIds, selected) {
        return this.app.tradeRPC.invoke('cart.updateSelectedByCartIds', [accountId, cartIds, selected]);
    }

    updateAllSelected(accountId, selected) {
        return this.app.tradeRPC.invoke('cart.updateAllSelected', [accountId, selected]);
    }

    async delByCartIds(accountId, cartIds) {
        if (!Array.isArray(cartIds) || cartIds.length == 0 || cartIds.some(id => typeof id !== 'number')) {
            return { success: false, code: -140, message: '请传入正确的购物车ID列表' };
        }

        const res = await this.app.mysql.get('trade')
            .query(`delete from cart where userId=? and id in (?)`, [accountId, cartIds]);
        return { success: true, code: 0, data: res };
    }
}

module.exports = CartService;