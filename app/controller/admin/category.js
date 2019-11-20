const { Controller } = require("egg");

class CategoryController extends Controller {
    async listCateByPid() {
        const { ctx } = this;

        const payloadRule = {
            pid: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            pid
        } = ctx.request.body;

        const result = await ctx.service.admin.category.listCateByPid(pid);
        ctx.body = result;
    }

    async addCate() {
        const { ctx } = this;

        const payloadRule = {
            level: { type: 'number', required: true },
            name: { type: 'string', required: true },
            pid: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            name,
            level,
            pid
        } = ctx.request.body;

        const result = await ctx.service.admin.category.addCate({
            name,
            level,
            pid
        });
        ctx.body = result;
    }

    async updateCate() {
        const { ctx } = this;

        const payloadRule = {
            name: { type: 'string', required: true },
            id: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            name,
            id
        } = ctx.request.body;

        const result = await ctx.service.admin.category.updateCate({
            name,
            id
        });
        ctx.body = result;
    }

    async getSpuPropDefinitions() {
        const { ctx } = this;

        const payloadRule = {
            categoryId: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            categoryId
        } = ctx.request.body;

        const result = await ctx.service.admin.category.getSpuPropDefinitions(categoryId);
        ctx.body = result;
    }

    async addSpuPropDefinition() {
        const { ctx } = this;

        const payloadRule = {
            categoryId: { type: 'number', required: true },
            type: { type: 'string', required: true },
            inputType: { type: 'string', required: true },
            label: { type: 'string', required: true },
            field: { type: 'string', required: true },
            rules: { type: 'string', required: false },
            inputProps: { type: 'string', required: false },
            options: { type: 'string', required: false },
        };
        ctx.validate(payloadRule);

        const result = await ctx.service.admin.category.addSpuPropDefinition(ctx.request.body);
        ctx.body = result;
    }

    async updateSpuPropDefinition() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: true },
            type: { type: 'string', required: true },
            inputType: { type: 'string', required: true },
            label: { type: 'string', required: true },
            field: { type: 'string', required: true },
            rules: { type: 'string', required: false },
            inputProps: { type: 'string', required: false },
            options: { type: 'string', required: false },
        };
        ctx.validate(payloadRule);

        const result = await ctx.service.admin.category.updateSpuPropDefinition(ctx.request.body);
        ctx.body = result;
    }
}

module.exports = CategoryController;