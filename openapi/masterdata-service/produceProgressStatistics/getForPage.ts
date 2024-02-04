// 流程数据基础搜索VO
export interface I流程数据基础搜索VO {
    // 全局搜索
    allSearch: string;
    // 当前页面
    pageNo: number;
    // 字段搜索
    dataSearchList: I流程数据明细搜索VO[];
    // 分页大小
    pageSize: number;
    // 排序字段集
    orders: I分页排序VO[];
    // 明细表表code，传值后，将会查询明细表数据
    tableColumnCode: string;
    // 当前的表单分组
    currentFormDataGrouping: I表单数据分组DTO;
}
// 流程数据明细搜索VO
export interface I流程数据明细搜索VO {
    // 列code
    code: string;
    // 搜索类型
    searchType: string;
    // 搜索文本 - 针对文本搜索
    text: string;
    // 搜索起始值 - 针对范围搜索
    limitBegin;
    // 搜索结束值 - 针对范围搜索
    limitEnd;
    // 搜索选项值 - 针对选择搜索
    selectors: undefined[];
    // 表格编码
    tableCode: string;
}
// 分页排序VO
export interface I分页排序VO {
    // undefined
    column: string;
    // undefined
    isAsc: string;
}
// 表单数据分组DTO
export interface I表单数据分组DTO {
    // 分组字段序列
    groupingFieldSerialNo: string;
    // 分组字段编码
    groupFieldCode: string;
    // 分组的值， 如果是关联表单，则是ID
    groupingValue: string;
    // 分组名称
    groupingName: string;
    // 下级分组
    children: I表单数据分组DTO[];
    // 级联表单数据，  级联表单的上下级关系  - Y, 多字段分组关系 - N
    cascadeFormData: string;
    // 多级基础数据上级ID
    treeDataParentId: number;
}
// JSONResult«分页信息«ProduceOrderStatisticsItemDTO»»
export interface IJSONResult分页信息ProduceOrderStatisticsItemDTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: I分页信息ProduceOrderStatisticsItemDTO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 分页信息«ProduceOrderStatisticsItemDTO»
export interface I分页信息ProduceOrderStatisticsItemDTO {
    // 当前页码
    pageNo: number;
    // 分页大小
    pageSize: number;
    // 总页数
    totalPage: number;
    // 总的记录数
    totalCount: number;
    // 分页列表
    list: IProduceOrderStatisticsItemDTO[];
    // 最后页页码
    lastPage: number;
    // 是否有上一页
    hasPreviousPage: string;
    // 是否有下一页
    hasNextPage: string;
    // 上一页页码
    previousPage: number;
    // 下一页页码
    nextPage: number;
}
// ProduceOrderStatisticsItemDTO
export interface IProduceOrderStatisticsItemDTO {
    // 生产订单ID
    produceOrderId: number;
    // 生产订单数据
    produceOrder;
    // 统计数据
    produceOrderStatisticsData: IProduceOrderStatisticsInfoDTO;
    // 工序统计数据列表
    processStatisticsDataList: IProcessStatisticsDataDTO[];
}
// ProduceOrderStatisticsInfoDTO
export interface IProduceOrderStatisticsInfoDTO {
    // 计划生产数量
    planQuantity: number;
    // 当前生产数量
    currentProductionQuantity: number;
    // 补单生产数量
    supplementProductionQuantity: number;
    // 订单完成率
    completionRate: number;
}
// ProcessStatisticsDataDTO
export interface IProcessStatisticsDataDTO {
    // 工序ID
    processId: number;
    // 工序名称
    processName: string;
    // 工序编码
    processCode: string;
    // 计划数量
    planQuantity: number;
    // 生产数量
    productionQuantity: number;
    // 完成率
    completionRate: number;
    // 在制数量
    wipQuantity: number;
}
