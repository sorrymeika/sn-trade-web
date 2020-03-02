const { Dao } = require('egg-dao');

const pad = (num) => (num + '').padStart(2, '0');

function createCode(id, type) {
    const now = new Date();
    const currentTime = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const idLast5 = (id + '').padStart(5, '0').slice(-5);
    const code = `10${pad(type)}${currentTime}${idLast5}`;
    return code;
}

class StockInDao extends Dao {
    static clientName() {
        return 'stock';
    }

    query(params, pageIndex, pageSize) {
        const {
            type,
            status,
            code,
            sellerId,
            warehouseId,
            warehouseType,
        } = params;
        const columns = ['id', 'code', 'sellerId', 'warehouseId', 'warehouseType', 'note', 'refundId', 'status', 'creator', 'createDt', 'modifyer', 'modifyDt', 'approver', 'approveDt'];
        let where = {};

        if (typeof sellerId === 'number' || (Array.isArray(sellerId) && sellerId.length > 0)) {
            where.sellerId = sellerId;
        }

        if (code) {
            where.code = code;
        } else {
            if (typeof type === 'number') {
                where.type = type;
            }

            if (typeof status === 'number') {
                where.status = status;
            }

            if (typeof warehouseType === 'number' && typeof warehouseId === 'number') {
                where.warehouseId = warehouseId;
                where.warehouseType = warehouseType;
            }
        }

        return this.connection.selectPage(
            columns,
            "stockIn",
            {
                where,
                pageIndex,
                pageSize
            }
        );
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
        const data = {
            sellerId,
            warehouseType,
            warehouseId,
            note,
            type,
            refundId,
            creator
        };
        const conn = this.connection;
        const res = await conn.insert('stockIn', data);
        const code = createCode(res.insertId, type);
        await conn.query('update stockIn set code=? where id=?', [code, res.insertId]);

        data.id = res.insertId;

        return data;
    }

    addStockInDetails(details) {
        return this.connection.insert('stockDetails', details);
    }
}

module.exports = StockInDao;