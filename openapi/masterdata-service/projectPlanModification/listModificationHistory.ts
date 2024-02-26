import { http } from '@/api/http';

/**
* @link http://47.108.139.107:16700/doc.html#/default/项目计划变更相关/listModificationHistoryUsingGET_2
*/
export default function fetchMethod(params: { projectId: string }, extraOptions?: any) {
    return http<IJSONResultListProjectCollectionChangeInformation>(
        {
            url: "/masterdata-service/projectPlanModification/listModificationHistory",
            method: "get",
            params,
        },
        extraOptions,
    );
}
/** JSONResult«List«项目集合变更信息»» */
export interface IJSONResultListProjectCollectionChangeInformation {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: IProjectCollectionChangeInformation[];
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
/** 项目集合变更信息 */
export interface IProjectCollectionChangeInformation {
    /** id */
    id: number;
    /** 来源应用编号 */
    fromAppCode: string;
    /** 来源应用id */
    fromAppId: number;
    /** code */
    code: string;
    /** 项目名称 */
    projectId: number;
    /** 项目编号 */
    projectCode: string;
    /** 发起变更人员 */
    modifyUserId: number;
    /** 版本创建时间 */
    createTime: string;
    /** 版本更新时间 */
    updateTime: string;
}
