import { http } from "@/api/http";

/**
* @author XieJian
* @link http://47.108.139.107:16400/doc.html#/default/设备保养计划相关/getChangeRecordListUsingGET
*/
export default function fetchMethod(options: { params: { planId?: string } }, extraOptions?: any) {
    return http<IJSONResultListMaintenancePlanChangeRecordRespondsToDTO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/deviceMaintainPlan/getChangeRecordList",
            method: "GET",
            ...options,
        },
        extraOptions,
    );
}
/** JSONResult«List«保养计划变更记录响应DTO»» */
export interface IJSONResultListMaintenancePlanChangeRecordRespondsToDTO {
    /** 返回码 */
    code?: number;
    /** 返回消息说明 */
    msg?: string;
    /** 响应结果 */
    data?: IMaintenancePlanChangeRecordRespondsToDTO[];
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts?: string;
}
/** 保养计划变更记录响应DTO */
export interface IMaintenancePlanChangeRecordRespondsToDTO {
    /** id */
    id?: string;
    /** 备注 */
    remark?: string;
    /** 操作人 */
    createUser?: string;
    /** 创建时间 */
    createTime?: number;
}
