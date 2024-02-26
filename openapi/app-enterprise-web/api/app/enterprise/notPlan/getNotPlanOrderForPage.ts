import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/未排产订单相关/getForPageUsingPOST_13
export default function fetchMethod(data: IProcessDataBaseSearchVO, extraOptions?: any) {
    return http<IJSONResultPageInformationDynamicExpansionDataVOUnscheduledProductionOrderReturnedToVO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/notPlan/getNotPlanOrderForPage",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 流程数据基础搜索VO
export interface IProcessDataBaseSearchVO {
    // 全局搜索
    allSearch: string;
    // 当前页面
    pageNo: number;
    // 字段搜索
    dataSearchList: IProcessDataDetailsSearchVO[];
    // 分页大小
    pageSize: number;
    // 排序字段集
    orders: IPagingSortVO[];
    // 明细表表code，传值后，将会查询明细表数据
    tableColumnCode: string;
    // 当前的表单分组
    currentFormDataGrouping: IFormDataGroupingDTO;
}
// 流程数据明细搜索VO
export interface IProcessDataDetailsSearchVO {
    // 列code
    code: string;
    // 搜索类型
    searchType: string;
    // 搜索文本 - 针对文本搜索
    text: string;
    // 搜索起始值 - 针对范围搜索
    limitBegin: Record<string, any>;
    // 搜索结束值 - 针对范围搜索
    limitEnd: Record<string, any>;
    // 搜索选项值 - 针对选择搜索
    selectors: Record<string, any>[];
    // 表格编码
    tableCode: string;
}
// 分页排序VO
export interface IPagingSortVO {
    // undefined
    column: string;
    // undefined
    isAsc: string;
}
// 表单数据分组DTO
export interface IFormDataGroupingDTO {
    // 分组字段序列
    groupingFieldSerialNo: string;
    // 分组字段编码
    groupFieldCode: string;
    // 分组的值， 如果是关联表单，则是ID
    groupingValue: string;
    // 分组名称
    groupingName: string;
    // 下级分组
    children: IFormDataGroupingDTO[];
    // 级联表单数据，  级联表单的上下级关系  - Y, 多字段分组关系 - N
    cascadeFormData: string;
    // 多级基础数据上级ID
    treeDataParentId: number;
}
// JSONResult«分页信息«动态拓展数据VO«未排产生产订单返回VO»»»
export interface IJSONResultPageInformationDynamicExpansionDataVOUnscheduledProductionOrderReturnedToVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IPageInformationDynamicExpansionDataVOUnscheduledProductionOrdersReturnToVO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 分页信息«动态拓展数据VO«未排产生产订单返回VO»»
export interface IPageInformationDynamicExpansionDataVOUnscheduledProductionOrdersReturnToVO {
    // 当前页码
    pageNo: number;
    // 分页大小
    pageSize: number;
    // 总页数
    totalPage: number;
    // 总的记录数
    totalCount: number;
    // 分页列表
    list: IDynamicExpansionDataVOUnscheduledProductionOrderReturnedToVO[];
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
// 动态拓展数据VO«未排产生产订单返回VO»
export interface IDynamicExpansionDataVOUnscheduledProductionOrderReturnedToVO {
    // 拓展数据
    ext: IUnscheduledProductionOrdersAreReturnedToVO;
    // 动态数据
    data: Record<string, Record<string, any>>;
}
// 未排产生产订单返回VO
export interface IUnscheduledProductionOrdersAreReturnedToVO {
    // 步骤集
    steps: IUnscheduledProductionOrderStepReturnToVO[];
}
// 未排产订单步骤返回VO
export interface IUnscheduledProductionOrderStepReturnToVO {
    // 步骤id
    id: number;
    // 工序id
    processId: number;
    // 工序名称
    processName: string;
    // 工序编号
    processCode: string;
    // 准备耗时
    readyTime: number;
    // 准备时间单位
    readyTimeUnit: string;
    // 产能-生产时间
    capacityProduceTime: number;
    // 产能-时间类型
    capacityTimeType: string;
    // 产能-生产数量
    capacityProduceQuantity: number;
}