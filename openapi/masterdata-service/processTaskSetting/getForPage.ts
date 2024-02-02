// 工序任务搜索VO
export interface I工序任务搜索VO {
    // 工序id集合
    processIds: number[];
    // 是否需要分配
    isAssign: string;
    // 当前页面
    pageNo: number;
    // 分页大小
    pageSize: number;
    // 排序字段集
    orders: 分页排序VO[];
}
// JSONResult«分页信息«工序任务设置VO»»
export interface IJSONResult分页信息工序任务设置VO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 分页信息«工序任务设置VO»;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
