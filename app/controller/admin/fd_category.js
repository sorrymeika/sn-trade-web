const { Controller } = require("egg");

class FdCategoryController extends Controller {
    async getCatesBySellerId() {
        const { ctx } = this;

        const payloadRule = {
            sellerId: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            sellerId
        } = ctx.request.body;

        const result = await ctx.service.admin.fdCategory.getCatesBySellerId(sellerId);
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

        const result = await ctx.service.admin.fdCategory.getSubCatesTreeByPid(pid);
        ctx.body = result;
    }

    async add() {
        const { ctx } = this;

        const payloadRule = {
            level: { type: 'number', required: true },
            name: { type: 'string', required: true },
            picture: { type: 'string', required: false },
            pid: { type: 'number', required: true },
            sort: { type: 'number', required: true },
            sellerId: { type: 'number', required: true },
            linkType: { type: 'number', required: false },
            link: { type: 'string', required: false },
            formulaId: { type: 'number', required: false }
        };
        ctx.validate(payloadRule);

        const {
            name,
            level,
            sellerId,
            picture,
            pid,
            sort,
            linkType,
            link,
            formulaId
        } = ctx.request.body;

        const result = await ctx.service.admin.fdCategory.add({
            name,
            sellerId,
            level,
            picture,
            pid,
            sort,
            linkType,
            link,
            formulaId
        });
        ctx.body = result;
    }

    async update() {
        const { ctx } = this;

        const payloadRule = {
            name: { type: 'string', required: true },
            id: { type: 'number', required: true },
            sort: { type: 'number', required: true },
            picture: { type: 'string', required: false },
            formulaId: { type: 'number', required: false },
            linkType: { type: 'number', required: false },
            link: { type: 'string', required: false },
        };
        ctx.validate(payloadRule);

        const {
            name,
            id,
            sort,
            picture,
            linkType,
            link,
            formulaId
        } = ctx.request.body;

        const result = await ctx.service.admin.fdCategory.update({
            name,
            id,
            sort,
            picture,
            linkType,
            link,
            formulaId
        });
        ctx.body = result;
    }

    async deleteById() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const {
            id
        } = ctx.request.body;

        const result = await ctx.service.admin.fdCategory.deleteById(id);
        ctx.body = result;
    }
}

module.exports = FdCategoryController;