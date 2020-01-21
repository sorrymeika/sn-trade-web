const pad = (num) => (num + '').padStart(2, '0');

function createCode(id, type) {
    const now = new Date();
    const currentTime = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const idLast5 = (id + '').padStart(5, '0').slice(-5);
    const code = `10${pad(type)}${currentTime}${idLast5}`;
    return code;
}

class StockInDao {
    constructor(conn) {
        this.conn = conn;
    }

    async addStockIn({
        sellerId,
        warehouseType,
        warehouseId,
        note,
        type,
        refundId,
        creator
    }) {
        const { conn } = this;
        const data = {
            sellerId,
            warehouseType,
            warehouseId,
            note,
            type,
            refundId,
            creator
        };
        const res = await conn.insert('stockIn', data);
        const code = createCode(res.insertId, type);
        await conn.query('update stockIn set code=? where id=?', [code, res.insertId]);

        data.id = res.insertId;

        return data;
    }

    addStockInDetails(details) {
        return this.conn.insert('stockDetails', [details]);
    }
}

module.exports = function (conn) {
    return new StockInDao(conn);
};