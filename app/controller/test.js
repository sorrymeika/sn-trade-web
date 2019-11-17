const { Controller } = require("egg");

class TestController extends Controller {
    async info() {
        const { ctx } = this;
        ctx.body = {
            name: `hello test`,
        };
    }
}

module.exports = TestController;