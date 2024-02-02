// 生产订单自动排产计算结果确定DTO
export interface I生产订单自动排产计算结果确定DTO {
    // 排产计划单名称
    planName: string;
    // 排产方式
    autoPlanType: string;
    // 是否考虑自动提前（要传计算时的值）
    isAutoMoveUp: string;
    // 排产开始时间 yyyy-MM-dd HH:mm:ss（要传计算时的值）
    beginTime: string;
    // 排产结束时间 yyyy-MM-dd HH:mm:ss（要传计算时的值）
    endTime: string;
    // 生产订单计划时间集
    produceOrderPlanTimes: 生产订单自动排产计划时间DTO[];
}
// JSONResult«object»
export interface IJSONResultobject {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
