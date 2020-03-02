const { Service } = require("egg");

class ExpressService extends Service {
    getExpressCompanies() {
        return this.app.stockRPC.invoke('expressCompany.getExpressCompanies');
    }
}

module.exports = ExpressService;