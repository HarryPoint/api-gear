// 环保S查询请求
export interface IEnvironmentalProtectionSQueryRequest {
    // 查询日期的开始
    dateRangeBegin: string;
    // 查询日期的结束
    dateRangeEnd: string;
}
// JSONResult«List«环保S查询响应»»
export interface IJSONResultListGreenSQueryResponse {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IEnvironmentalProtectionSQueryResponse[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 环保S查询响应
export interface IEnvironmentalProtectionSQueryResponse {
    // ID
    id: number;
    // 环保日期
    environmentalProtectionDate: string;
    // 发生事件数量
    eventQuantity: number;
    // 政府通报处罚数量
    penaltyQuantity: number;
    // 重大隐患处理率
    dangerHandlerRate: string;
    // 重大隐患处理数量
    majorHazardQuantity: number;
    // 是否有异常
    isException: string;
}
