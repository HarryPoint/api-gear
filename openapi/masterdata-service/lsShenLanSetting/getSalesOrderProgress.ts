// JSONResult«List«质检生产大屏订单完成进度返回VO»»
export interface IJSONResultList质检生产大屏订单完成进度返回VO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: I质检生产大屏订单完成进度返回VO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 质检生产大屏订单完成进度返回VO
export interface I质检生产大屏订单完成进度返回VO {
    // id(销售订单明细id)
    id: number;
    // 销售订单id
    salesOrderId: number;
    // 销售订单号(编号)
    salesOrderNo: string;
    // 客户id
    customerId: number;
    // 客户名称
    customerName: string;
    // 物料id
    majorDataId: number;
    // 物料名称(产品名称)
    majorDataName: string;
    // 物料型号(产品型号)
    majorDataSpec: string;
    // 交货日期
    deliveryDate: string;
    // 计划结束日期
    endTime: string;
    // 当前区域id
    lastAreaId: number;
    // 当前区域名称(当前工作组)
    lastAreaName: string;
    // 当前区域进入时间(进入工作组日期)
    lastAreaTime: string;
}
