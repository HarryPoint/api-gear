// JSONResult«List«SalesStatisticsItemOutputVO»»
export interface IJSONResultListSalesStatisticsItemOutputVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: SalesStatisticsItemOutputVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
