class CustomError extends Error {
    constructor({ message, ...data }) {
        super(message);
        Object.assign(this, data);
    }
}

module.exports = {
    async isMySeller(sellerId) {
        if (!sellerId) {
            return { success: false, code: "INVALIDATE_SELLER_ID", message: '错误的商户ID' };
        }
        const account = await this.ctx.getAuth();
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

    async validateMySeller(sellerId) {
        const isMySellerResult = await this.isMySeller(sellerId);
        if (!isMySellerResult.success) {
            throw new CustomError(isMySellerResult);
        }
        return true;
    },

    async getMySellers() {
        const account = await this.ctx.getAuth();
        if (!account) {
            throw new CustomError({ code: "NO_PROMISSION", message: '无权限' });
        }
        const res = await this.app.sellerRPC.invoke('seller.getSellersByAccountId', [account.id]);
        if (!res.success) {
            throw new CustomError(res);
        }
        return res.data;
    },

    async getMySellerIds() {
        return (await this.getMySellers()).map(seller => seller.id);
    },
};