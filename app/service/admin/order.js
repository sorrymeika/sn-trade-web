const { Service } = require("egg");

const PARAM_ERROR = { success: false, code: -140, message: '参数错误' };
const ORDER_STATUS_ERROR = { success: false, code: 13006, message: '订单状态有误!' };

const PAY_EXPIRE_TIME = 1000 * 60 * 30;


class OrderService extends Service {
    async queryOrders({ statusType, sellerId, tradeCode, tradeId, sellerOrderId, receiver, phoneNo, pageIndex, pageSize }) {
        if ((typeof pageIndex !== 'number' || pageIndex <= 0) || (typeof pageSize !== 'number' || pageSize <= 0)) {
            return PARAM_ERROR;
        }

        let where = '1=1';
        const params = [];

        if (statusType != null) {
            if (typeof statusType === 'number') {
                if (statusType == -1) {
                    where += ' and (c.status=-1 or (c.status=0 and a.addDt<?))';
                    params.push(new Date(Date.now() - PAY_EXPIRE_TIME));
                } else {
                    where += ' and c.status=?';
                    params.push(statusType);
                }
            } else if (Array.isArray(statusType) && statusType.every(stat => typeof stat === 'number')) {
                where += ` and c.status in (${statusType.join(',')})`;
            } else {
                return PARAM_ERROR;
            }
        }

        if (typeof sellerId === 'number') {
            where += ' and c.sellerId=?';
            params.push(sellerId);
        }

        if (typeof sellerOrderId === 'number') {
            where += ' and c.sellerOrderId=?';
            params.push(sellerOrderId);
        }

        if (tradeCode) {
            where += ' and a.code=?';
            params.push(tradeCode);
        }

        if (tradeId) {
            where += ' and a.id=?';
            params.push(tradeId);
        }

        if (receiver) {
            where += ' and b.receiver=?';
            params.push(receiver);
        }

        if (phoneNo) {
            where += ' and b.phoneNo=?';
            params.push(phoneNo);
        }

        const conn = this.app.mysql.get('trade');

        const [countRows, orderRows] = await Promise.all([
            conn.query(
                `select 
                        count(1) as total 
                    from trade a
                        inner join tradeAddress b on a.id=b.tradeId
                        inner join sellerOrder c on a.id=c.tradeId
                    where ${where}`,
                params
            ),
            conn.query(
                `select 
                    a.id as tradeId,a.code,a.userId,a.totalAmount,a.totalPostFee,a.addDt,
                    b.receiver,b.phoneCountryCode,b.phoneNo,b.provinceCode,b.cityCode,b.districtCode,b.detail,
                    c.sellerId,c.note,c.postFee,c.amount,c.status,c.payStatus,c.refundStatus,c.returnStatus,c.id,c.payDt,c.deliverDt,c.dealDt,c.updateDt
                from trade a
                    inner join tradeAddress b on a.id=b.tradeId
                    inner join sellerOrder c on a.id=c.tradeId
                where ${where} limit ${(pageIndex - 1) * pageSize},${pageSize}`,
                params
            )
        ]);

        const sellerIds = [];

        orderRows.forEach(row => {
            if (row.payStatus == 0 && Date.now() > new Date(row.addDt).getTime() + PAY_EXPIRE_TIME) {
                row.status = -1;
            }

            if (!sellerIds.includes(row.sellerId)) {
                sellerIds.push(row.sellerId);
            }
        });

        const { data: sellers } = await this.app.sellerRPC.invoke('seller.listSellerByIds', [sellerIds]);
        orderRows.forEach(current => {
            const seller = sellers.find(row => row.id == current.sellerId);
            if (seller) {
                current.sellerName = seller.name;
                current.logo = seller.logo;
            }
        });

        return {
            success: true,
            data: orderRows,
            total: countRows[0].total
        };
    }

    async getSellerOrderById(sellerOrderId) {
        const sellerOrderRows = await this.app.mysql.get('trade').query(
            `select 
                a.id,a.tradeId,a.sellerId,a.status,a.payStatus,a.refundStatus,a.returnStatus,a.note,a.postFee,a.amount,a.refund,a.payDt,a.dealDt,a.updateDt,
                b.code,b.userId,b.totalAmount,b.totalPostFee,b.totalRefund,b.addDt
            from sellerOrder a
            inner join trade b on a.tradeId=b.id
            where a.id=?`, [sellerOrderId]
        );

        await this._completeSellerOrders(sellerOrderRows);

        const orderInfo = sellerOrderRows[0];
        const addressInfo = await this.app.tradeRPC.invoke('order.getOrderAddress', [orderInfo.tradeId]);

        return {
            success: true,
            data: {
                orderInfo,
                addressInfo
            }
        };
    }

    _completeSellerOrders(sellerOrderRows) {
        const sellerOrderIds = [];
        const sellerIds = [];

        sellerOrderRows.forEach(row => {
            sellerOrderIds.push(row.id);

            if (!sellerIds.includes(row.sellerId)) {
                sellerIds.push(row.sellerId);
            }

            if (row.payStatus == 0 && Date.now() > new Date(row.addDt).getTime() + PAY_EXPIRE_TIME) {
                row.status = -1;
            }

            row.payable = row.payStatus == 0 && row.status != -1;
            row.total = 0;
            row.skus = [];
        });

        return Promise.all([
            // 获取商户信息
            this.app.sellerRPC.invoke('seller.listSellerByIds', [sellerIds])
                .then(sellersRes => {
                    if (sellersRes.success) {
                        sellerOrderRows.forEach(current => {
                            const seller = sellersRes.data.find(row => row.id == current.sellerId);
                            if (seller) {
                                current.sellerName = seller.name;
                                current.logo = seller.logo;
                            }
                        });
                    }
                    return sellerOrderRows;
                }),
            // 获取订单SKU信息
            this.app.mysql.get('trade').query(
                `select 
                        id,status,tradeId,sellerOrderId,sellerId,skuId,num,price,skuProps
                    from tradeDetail
                    where sellerOrderId in (${sellerOrderIds.join(',')})`
            )
                .then((skus) => {
                    const skuIds = skus.reduce((ids, row) => {
                        if (!ids.includes(row.skuId)) {
                            ids.push(row.skuId);
                        }
                        return ids;
                    }, []);

                    return this.app.productRPC.invoke('product.getBuySkusByIds', [skuIds])
                        .then(sourceSkus => {
                            if (sourceSkus.success) {
                                skus.forEach(sku => {
                                    const skuInfo = sourceSkus.data.find(skuInfo => sku.skuId == skuInfo.skuId);
                                    if (skuInfo) {
                                        const { price, ...moreProps } = skuInfo;
                                        sku.currentPrice = price;
                                        Object.assign(sku, moreProps);
                                    }
                                    const sellerOrder = sellerOrderRows.find(row => row.id == sku.sellerOrderId);
                                    if (sellerOrder.status === -1) {
                                        sku.status = -1;
                                    }
                                    sellerOrder.skus.push(sku);
                                    sellerOrder.total += sku.num;
                                });
                            }
                            return skus;
                        });
                })
        ]);
    }

    /**
     * 批量发货
     * @param {object[]} sellerOrders 商户订单列表
     * @param {number} sellerOrders[].id 仓库类型
     * @param {number} sellerOrders[].warehouseType 仓库类型
     * @param {number} sellerOrders[].warehouseId 仓库ID
     * @param {string} sellerOrders[].remarks 备注
     */
    async batchSendOut(sellerOrders) {
        if (!Array.isArray(sellerOrders) || !sellerOrders.length || !sellerOrders.every(({ id, warehouseType, warehouseId }) => typeof id === 'number' && typeof warehouseType == 'number' && typeof warehouseId == 'number')) {
            return PARAM_ERROR;
        }

        const sellerOrderIds = sellerOrders.map(sellerOrder => sellerOrder.id);
        const conn = this.app.mysql.get('trade');
        const sellerOrderRows = await conn.query(
            `select id,status,sellerId,payStatus from sellerOrder where id IN (?)`, [sellerOrderIds]
        );

        for (let i = 0; i < sellerOrderRows.length; i++) {
            const isMySeller = await this.ctx.isMySeller(sellerOrderRows[i].sellerId);
            if (!isMySeller.success) {
                return isMySeller;
            }
        }

        if (!sellerOrderRows.every(row => row.status == 1)) {
            return ORDER_STATUS_ERROR;
        }

        for (let i = 0; i < sellerOrderRows.length; i++) {
            const { sellerId, id } = sellerOrderRows[i];
            const { warehouseType, warehouseId } = sellerOrders.find(sellerOrder => sellerOrder.id === id);
            const stockRes = await this.app.stockRPC.invoke('stock.sendOut', [sellerId, id, warehouseType, warehouseId]);
            if (!stockRes.success) {
                return stockRes;
            }
        }

        return await conn.beginTransactionScope(async (conn) => {
            await conn.query('update sellerOrder set status=? where status=? and id in (?)', [2, 1, sellerOrderIds]);
            await conn.query('update tradeDetail set status=? where status=? and sellerOrderId in (?)', [2, 1, sellerOrderIds]);
            return { success: true };
        }, this.ctx);
    }
}

module.exports = OrderService;