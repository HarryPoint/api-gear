import { http } from '@/api/http';

/**
* @link http://47.108.139.107:16400/doc.html#/default/工序相关/setQualityInspectorUsingPOST
*/
export default function fetchMethod(data: ISetExecutorDTO[], params: { id: number }, extraOptions?: any) {
    return http<IJSONResultstring>(
        {
            url: "/app-enterprise-web/api/app/enterprise/process/setQualityInspector",
            method: "post",
            data,
            params,
        },
        extraOptions,
    );
}
/** SetExecutorDTO */
export interface ISetExecutorDTO {
    /** undefined */
    executorType: string;
    /** undefined */
    refIdList: number[];
}
/** JSONResult«string» */
export interface IJSONResultstring {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: string;
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
