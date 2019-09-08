const { Controller } = require("egg");

class CategoryController extends Controller {
    async addCate() {
        const { ctx } = this;

        const payloadRule = {
            level: { type: 'number', required: true },
            name: { type: 'string', required: true },
            pid: { type: 'number', required: false }
        };
        ctx.validate(payloadRule);

        const {
            name,
            level,
            pid
        } = ctx.request.body;

        const result = await ctx.service.cate.addCate({
            name,
            level,
            pid
        });
        ctx.body = result;
    }
}

module.exports = TemplateController;