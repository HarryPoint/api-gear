// 生产排产订单搜索VO
export interface I生产排产订单搜索VO {
    // 当前页面
    pageNo: number;
    // 分页大小
    pageSize: number;
    // 排序字段集
    orders: 分页排序VO[];
    // 生产订单编号
    produceOrderCode: string;
    // 父级订单编号
    parentProduceOrderCode: string;
    // 销售订单编号
    salesOrderCode: string;
    // 物料id集合
    materialIds: number[];
    // 计划开始日期查询开始时间
    startTimeOfBeginTime: string;
    // 计划开始日期查询结束时间
    endTimeOfBeginTime: string;
    // 排产方式集合
    planTypeList: string[];
    // 计划结束日期查询结束时间
    endTimeOfEndTime: string;
    // 计划结束日期查询开始时间
    startTimeOfEndTime: string;
}
// JSONResult«分页信息«排产订单报表VO(销售单维度)»»
export interface IJSONResult分页信息排产订单报表VO销售单维度 {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 分页信息«排产订单报表VO(销售单维度)»;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
