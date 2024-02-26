import { http } from '@/api/http';

/**
* @link http://47.108.139.107:16400/doc.html#/default/工时工费相关/getMonthPageUsingPOST
*/
export default function fetchMethod(data: IMonthlyReportOfHourlyLaborFeeSearchVO, extraOptions?: any) {
    return http<IJSONResultPageInformationMonthlySummaryReportOfLaborTimeIsReturnedToVO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/produceTimeFeeReport/getMonthPage",
            method: "post",
            data,
        },
        extraOptions,
    );
}
/** 工时工费月度报表搜索VO */
export interface IMonthlyReportOfHourlyLaborFeeSearchVO {
    /** 当前页面 */
    pageNo: number;
    /** 分页大小 */
    pageSize: number;
    /** 排序字段集 */
    orders: IPagingSortVO[];
    /** 员工id集 */
    userIds: number[];
    /** 班组id集 */
    classGroupIds: number[];
    /** 查询开始日期 yyyy-MM-dd HH:mm:ss */
    beginTime: string;
    /** 查询结束日期 yyyy-MM-dd HH:mm:ss */
    endTime: string;
}
/** 分页排序VO */
export interface IPagingSortVO {
    /** undefined */
    column: string;
    /** undefined */
    isAsc: string;
}
/** JSONResult«分页信息«工时工费月度汇总报表返回VO»» */
export interface IJSONResultPageInformationMonthlySummaryReportOfLaborTimeIsReturnedToVO {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: IPageInformationMonthlySummaryReportOfManHourFeeReturnsToVO;
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
/** 分页信息«工时工费月度汇总报表返回VO» */
export interface IPageInformationMonthlySummaryReportOfManHourFeeReturnsToVO {
    /** 当前页码 */
    pageNo: number;
    /** 分页大小 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总的记录数 */
    totalCount: number;
    /** 分页列表 */
    list: IMonthlySummaryReportOfManHourPaymentIsReturnedToVO[];
    /** 最后页页码 */
    lastPage: number;
    /** 是否有上一页 */
    hasPreviousPage: string;
    /** 是否有下一页 */
    hasNextPage: string;
    /** 上一页页码 */
    previousPage: number;
    /** 下一页页码 */
    nextPage: number;
}
/** 工时工费月度汇总报表返回VO */
export interface IMonthlySummaryReportOfManHourPaymentIsReturnedToVO {
    /** 月份 */
    month: string;
    /** 员工id */
    userId: number;
    /** 员工姓名 */
    username: string;
    /** 班组id */
    classGroupId: number;
    /** 班组名称 */
    classGroupName: string;
    /** 合格产出工费 */
    produceFee: number;
    /** 返工产出工费 */
    backFee: number;
    /** 合计工费 */
    totalFee: number;
}
