const { Controller } = require("egg");

const { NO_PERMISSION } = require("../../constants/error");

class WarehouseController extends Controller {
    async queryWarehouses() {
        const { ctx } = this;

        const payloadRule = {
            keywords: { type: 'string', required: false },
            id: { type: 'number', required: false },
            sellerId: { type: 'number', required: false },
        };
        ctx.validate(payloadRule);

        if (!ctx.accountId) {
            ctx.body = NO_PERMISSION;
            return;
        }

        const body = ctx.request.body;

        const { accountId } = ctx;
        const {
            id,
            sellerId,
            keywords,
        } = body;

        let sellerIds;

        if (sellerId) {
            const { value: isMySeller } = await this.app.sellerRPC.invoke('seller.isMySeller', [accountId, sellerId]);
            if (!isMySeller) {
                ctx.body = NO_PERMISSION;
                return;
            }
        } else {
            const { data: ids } = await this.app.sellerRPC.invoke('seller.listMySellerIds', [accountId]);
            sellerIds = ids;
        }

        const result = await ctx.service.admin.warehouse.queryWarehouses({
            id,
            sellerId,
            sellerIds,
            keywords,
        });
        ctx.body = result;
    }

    async getMyWarehouses() {
        const { ctx } = this;

        const result = await ctx.service.admin.warehouse.getMyWarehouses();
        ctx.body = result;
    }

    async addWarehouse() {
        const { ctx } = this;

        const payloadRule = {
            sellerId: { type: 'number', required: true },
            name: { type: 'string', required: true },
            tags: { type: 'string', required: true },
            provinceCode: { type: 'string', required: true },
            cityCode: { type: 'string', required: true },
            districtCode: { type: 'string', required: true },
            address: { type: 'string', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const result = await ctx.service.admin.warehouse.addWarehouse(body);
        ctx.body = result;
    }

    async updateWarehouse() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: true },
            sellerId: { type: 'number', required: true },
            name: { type: 'string', required: true },
            tags: { type: 'string', required: true },
            provinceCode: { type: 'string', required: true },
            cityCode: { type: 'string', required: true },
            districtCode: { type: 'string', required: true },
            address: { type: 'string', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const result = await ctx.service.admin.warehouse.updateWarehouse(body);
        ctx.body = result;
    }
}

module.exports = WarehouseController;