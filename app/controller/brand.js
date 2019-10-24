const { Controller } = require("egg");
const { json } = require("../core/response");

class BrandController extends Controller {
    async queryBrands() {
        const { ctx } = this;

        const payloadRule = {
            name: { type: 'string', required: false },
            id: { type: 'number', required: false },
            sellerId: { type: 'number', required: false },
            status: { type: 'number', required: false },
            hasBrandAuth: { type: 'number', required: false },
            brandType: { type: 'number', required: false },
            pageIndex: { type: 'number', required: true },
            pageSize: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            id,
            sellerId,
            name,
            status,
            brandType,
            hasBrandAuth,
            pageIndex,
            pageSize
        } = body;

        const result = await ctx.service.brand.queryBrands({
            id,
            sellerId,
            name,
            status,
            brandType,
            hasBrandAuth,
            pageIndex,
            pageSize
        });
        ctx.body = json(result);
    }

    async getBrandById() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: true }
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            id
        } = body;

        const result = await ctx.service.brand.getBrandById({
            id
        });
        ctx.body = result;
    }

    async addBrand() {
        const { ctx } = this;

        const payloadRule = {
            name: { type: 'string', required: true },
            logo: { type: 'string', required: true },
            sellerId: { type: 'number', required: true },
            countryId: { type: 'number', required: true },
            brandType: { type: 'number', required: true },
            note: { type: 'string', required: false },
            hasBrandAuth: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            name,
            logo,
            sellerId,
            countryId,
            brandType,
            note,
            hasBrandAuth
        } = body;

        let authData = {};

        if (hasBrandAuth) {
            authData.brandExp = body.brandExp;

            // brandType - 品牌类型: enum { 1: '普通', 2: '海淘' }
            if (brandType == 1) {
                const authRule = {
                    trademarkRegPic: { type: 'string', required: true },
                    brandAuthPic: { type: 'string', required: true },
                    inspectionReportPic: { type: 'string' },
                    companyBLPic: { type: 'string' },
                    approvalLicencePic: { type: 'string' },
                    oemAgreementPic: { type: 'string' },
                };
                ctx.validate(authRule);

                authData.trademarkRegPic = body.trademarkRegPic;
                authData.brandAuthPic = body.brandAuthPic;
                authData.inspectionReportPic = body.inspectionReportPic;
                authData.companyBLPic = body.companyBLPic;
                authData.approvalLicencePic = body.approvalLicencePic;
                authData.oemAgreementPic = body.oemAgreementPic;
            } else {
                const authRule = {
                    oosBrandAuthPic: { type: 'string' },
                    oosPurchaseInvoicePic: { type: 'string' }
                };
                ctx.validate(authRule);

                authData.oosBrandAuthPic = body.oosBrandAuthPic;
                authData.oosPurchaseInvoicePic = body.oosPurchaseInvoicePic;
            }
        }

        const result = await ctx.service.brand.addBrand({
            name,
            logo,
            sellerId,
            countryId,
            brandType,
            note,
            hasBrandAuth,
            ...authData
        });
        ctx.body = result;
    }

    async updateBrand() {
        const { ctx } = this;

        const payloadRule = {
            id: { type: 'number', required: true },
            name: { type: 'string', required: true },
            logo: { type: 'string', required: true },
            sellerId: { type: 'number', required: true },
            countryId: { type: 'number', required: true },
            brandType: { type: 'number', required: true },
            note: { type: 'string', required: false },
            hasBrandAuth: { type: 'number', required: true },
        };
        ctx.validate(payloadRule);

        const body = ctx.request.body;

        const {
            id,
            name,
            logo,
            sellerId,
            countryId,
            brandType,
            note,
            hasBrandAuth
        } = body;

        let authData = {};

        if (hasBrandAuth) {
            authData.brandExp = body.brandExp;

            // brandType - 品牌类型: enum { 1: '普通', 2: '海淘' }
            if (brandType == 1) {
                const authRule = {
                    trademarkRegPic: { type: 'string', required: true },
                    brandAuthPic: { type: 'string', required: true },
                    inspectionReportPic: { type: 'string' },
                    companyBLPic: { type: 'string' },
                    approvalLicencePic: { type: 'string' },
                    oemAgreementPic: { type: 'string' },
                };
                ctx.validate(authRule);

                authData.trademarkRegPic = body.trademarkRegPic;
                authData.brandAuthPic = body.brandAuthPic;
                authData.inspectionReportPic = body.inspectionReportPic;
                authData.companyBLPic = body.companyBLPic;
                authData.approvalLicencePic = body.approvalLicencePic;
                authData.oemAgreementPic = body.oemAgreementPic;
            } else {
                const authRule = {
                    oosBrandAuthPic: { type: 'string' },
                    oosPurchaseInvoicePic: { type: 'string' }
                };
                ctx.validate(authRule);

                authData.oosBrandAuthPic = body.oosBrandAuthPic;
                authData.oosPurchaseInvoicePic = body.oosPurchaseInvoicePic;
            }
        }

        const result = await ctx.service.brand.updateBrand({
            id,
            name,
            logo,
            sellerId,
            countryId,
            brandType,
            note,
            hasBrandAuth,
            ...authData
        });
        ctx.body = result;
    }
}

module.exports = BrandController;