import { http } from '@/api/http';

/**
* @link http://47.108.139.107:16500/doc.html#/default/任务班次关联相关/getExecutorByNowUsingGET
*/
export default function fetchMethod(data: number[], params: { enterpriseId: number }, extraOptions?: any) {
    return http<IJSONResultListProcessNodeExecutorVO>(
        {
            url: "/flow-service/flowPathShiftUserRp/getExecutorByNow",
            method: "get",
            data,
            params,
        },
        extraOptions,
    );
}
/** JSONResult«List«流程节点执行人VO»» */
export interface IJSONResultListProcessNodeExecutorVO {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: IProcessNodeExecutorVO[];
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
/** 流程节点执行人VO */
export interface IProcessNodeExecutorVO {
    /** id */
    id: number;
    /** 名称 */
    name: string;
    /** 执行人id */
    executorId: number;
    /** 执行人类型 */
    executorType: string;
    /** 执行人系统控件类型 */
    executorSysType: string;
    /** 组织字段序列 - 即动态控件 */
    organizationFieldSerialNo: string;
    /** flowPathId */
    flowPathId: number;
    /** 节点ID */
    flowPathNodeId: number;
}
