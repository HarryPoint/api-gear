import { http } from "@/api/http";

/**
* @author TanPeng
* @link http://47.108.139.107:16400/doc.html#/default/项目甘特图相关/exportProjectGanttExcelUsingPOST
*/
export default function fetchMethod(options: { data: IProjectGanttChartQueryObject }, extraOptions?: any) {
    return http<IJSONResultlong>(
        {
            url: "/app-enterprise-web/api/app/enterprise/kaizenProjectGantt/exportProjectGanttExcel",
            method: "POST",
            ...options,
        },
        extraOptions,
    );
}
/** 项目甘特图查询对象 */
export interface IProjectGanttChartQueryObject {
    /** 项目名称 */
    projectName?: string;
    /** 项目任务名称 */
    projectTaskName?: string;
    /** 项目类型集合 */
    projectTypeList?: string[];
    /** 任务优先级集合 */
    priorityList?: EProjectGanttChartQueryObject_priorityList_items[];
    /** 项目状态集合 */
    projectStatusList?: EProjectGanttChartQueryObject_projectStatusList_items[];
    /** 任务状态 */
    projectTaskStatusList?: EProjectGanttChartQueryObject_projectTaskStatusList_items[];
    /** 项目负责人id集合 */
    projectLeaderIdList?: string[];
    /** 任务执行人id集合 */
    projectTaskLeaderIdList?: string[];
    /** 项目查询开始日期 */
    projectStartDate?: number;
    /** 项目查询截止日期 */
    projectEndDate?: number;
    /** 项目任务查询开始日期 */
    projectTaskStartDate?: number;
    /** 项目任务查询截止日期 */
    projectTaskEndDate?: number;
    /** 项目id集合 */
    projectIdList?: string[];
}
/** JSONResult«long» */
export interface IJSONResultlong {
    /** 返回码 */
    code?: number;
    /** 返回消息说明 */
    msg?: string;
    /** 响应结果 */
    data?: string;
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts?: string;
}

export enum EProjectGanttChartQueryObject_priorityList_items {
    LOW = "LOW",
    NORMAL = "NORMAL",
    EMERGENCY = "EMERGENCY",
    EXTREME_EMERGENCY = "EXTREME_EMERGENCY"
}

export enum EProjectGanttChartQueryObject_projectStatusList_items {
    DRAFT = "DRAFT",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}

export enum EProjectGanttChartQueryObject_projectTaskStatusList_items {
    WAIT = "WAIT",
    HANDLING = "HANDLING",
    COMPLETE = "COMPLETE",
    CANCELED = "CANCELED"
}
