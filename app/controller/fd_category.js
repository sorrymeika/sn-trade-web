const { Controller } = require("egg");

class FdCategoryController extends Controller {
    async getCates() {
        const { ctx } = this;

        const payloadRule = {
            sellerId: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            sellerId
        } = ctx.request.body;

        const result = await ctx.service.fdCategory.getCates(sellerId);
        ctx.body = result;
    }

    async getSubCatesTreeByPid() {
        const { ctx } = this;

        const payloadRule = {
            pid: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            pid
        } = ctx.request.body;

        const result = await ctx.service.fdCategory.getSubCatesTreeByPid(pid);
        ctx.body = result;
    }
}

module.exports = FdCategoryController;