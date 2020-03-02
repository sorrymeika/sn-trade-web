const { Controller } = require('egg');

module.exports = class ExpressController extends Controller {
    async getExpressCompanies() {
        const { ctx } = this;
        const result = await ctx.service.express.getExpressCompanies();
        ctx.body = result;
    }
};
