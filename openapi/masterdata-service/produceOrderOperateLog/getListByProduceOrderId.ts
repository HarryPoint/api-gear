// JSONResult«List«生产订单详情 - 操作日志VO»»
export interface IJSONResultListProductionOrderDetailsOperationLogVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IProductionOrderDetailsOperationLogVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 生产订单详情 - 操作日志VO
export interface IProductionOrderDetailsOperationLogVO {
    // 操作人id
    operateUserId: number;
    // 操作人名称
    operateUsername: string;
    // 操作时间
    operateTime: string;
    // 操作内容
    operateContent: string;
}