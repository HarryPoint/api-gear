import { http } from '@/api/http';

/**
* @link http://47.108.139.107:16400/doc.html#/default/产出报表(按工序统计)相关/getExportTicketUsingPOST_14
*/
export default function fetchMethod(data: IOutputClassReportSearchVO, extraOptions?: any) {
    return http<IJSONResultExportedTicketInformation>(
        {
            url: "/app-enterprise-web/api/app/enterprise/produceProcessReport/getExportTicket",
            method: "post",
            data,
        },
        extraOptions,
    );
}
/** 产出类报表搜索VO */
export interface IOutputClassReportSearchVO {
    /** 班组id集 */
    classGroupIds: number[];
    /** 物料id集 */
    materialIds: number[];
    /** 工序id集 */
    processIds: number[];
    /** 日期筛选 - 开始 yyyy-MM-dd HH:mm:ss */
    beginTime: string;
    /** 日期筛选 - 结束 yyyy-MM-dd HH:mm:ss */
    endTime: string;
    /** 查询时间维度类型 */
    timeType: string;
}
/** JSONResult«导出ticket信息» */
export interface IJSONResultExportedTicketInformation {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: IExportingTicketInformation;
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
/** 导出ticket信息 */
export interface IExportingTicketInformation {
    /** 导出凭证ticket */
    ticket: string;
}
