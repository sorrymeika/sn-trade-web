const SymbolDao = Symbol.for('egg/context#dao');

module.exports = {
    async isMySeller(sellerId) {
        const account = await this.getAuth();
        if (!account) {
            return { success: false, code: "NO_PROMISSION", message: '无权限' };
        }
        const res = await this.app.sellerRPC.invoke('seller.isMySeller', [account.id, sellerId]);
        if (!res.success) {
            return res;
        } else if (!res.value) {
            return { success: false, code: "NO_SELLER_PROMISSION", message: '无权限' };
        }
        return { success: true };
    },

    async getMySellers() {
        const account = await this.getAuth();
        if (!account) {
            return { success: false, code: "NO_PROMISSION", message: '无权限' };
        }
        return this.app.sellerRPC.invoke('seller.getSellersByAccountId', [account.id]);
    },

    get dao() {
        if (!this[SymbolDao]) {
            this[SymbolDao] = {
                stockIn: require('../dao/stockIn')
            };
        }
        return this[SymbolDao];
    }
};