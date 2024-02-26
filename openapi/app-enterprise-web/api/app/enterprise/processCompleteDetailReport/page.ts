import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/工序完成明细表/pageUsingPOST_1
export default function fetchMethod(data: IProcedureCompletionListQuery, extraOptions?: any) {
    return http<IJSONResultPagingInformationOperationCompletionDetailTableResponseDto>(
        {
            url: "/app-enterprise-web/api/app/enterprise/processCompleteDetailReport/page",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 工序完成明细表查询
export interface IProcedureCompletionListQuery {
    // 当前页面
    pageNo: number;
    // 分页大小
    pageSize: number;
    // 工序ids
    processIds: number[];
    // 排序字段集
    orders: IPagingSort[];
    // 配置号
    configNo: string;
    // 汇总聚合维度字段集
    groupBys: string[];
    // 导出字段集
    exportFields: string[];
    // 日期 -- 开始
    beginTime: string;
    // 日期 -- 结束
    endTime: string;
    // 生产订单号
    produceOrderCode: string;
    // 物料id集合
    materialIdList: number[];
    // 实际完工量
    realProduceNumRange: number[];
    // 是否主订单
    isMaster: string;
    // 生产任务编号
    taskNo: string;
    // 报工人员集合
    reportUserList: Record<string, any>[];
    // 当日计划量
    planProduceNumRange: number[];
    // 当日计划完工量
    curPlanCompleteNumRange: number[];
    // 任务计划开工日期
    taskBeginTime: string;
    // 任务计划开工日期
    taskEndTime: string;
    // 是否根据排班日期查询
    isQueryByCalendar: boolean;
    // 排班日期集合
    calendarDayList: LocalDate[];
}
// 分页排序
export interface IPagingSort {
    // 需要进行排序的字段
    column: string;
    // 是否正序排列，默认Y
    isAsc: string;
}
// JSONResult«分页信息«工序完成明细表响应dto»»
export interface IJSONResultPagingInformationOperationCompletionDetailTableResponseDto {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IPageInformationProcessCompletionDetailTableResponseDto;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 分页信息«工序完成明细表响应dto»
export interface IPageInformationProcessCompletionDetailTableResponseDto {
    // 当前页码
    pageNo: number;
    // 分页大小
    pageSize: number;
    // 总页数
    totalPage: number;
    // 总的记录数
    totalCount: number;
    // 分页列表
    list: IProcessCompletionDetailsRespondToDto[];
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
// 工序完成明细表响应dto
export interface IProcessCompletionDetailsRespondToDto {
    // 日期
    day: string;
    // 生产工序id
    processId: number;
    // 生产工序名
    processName: string;
    // 当日计划量
    planProduceNum: number;
    // 当日计划完工量
    curPlanCompleteNum: number;
    // 实际完工量
    realProduceNum: number;
    // 生产订单列表
    produceOrderList: IProcessCompletionDetailsProductionOrderResponseDto[];
}
// 工序完成明细表生产订单响应dto
export interface IProcessCompletionDetailsProductionOrderResponseDto {
}