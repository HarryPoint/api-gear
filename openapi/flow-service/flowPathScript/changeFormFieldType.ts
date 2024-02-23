import { http } from '@/api/http';

// http://47.108.139.107:16500/doc.html#/default/应用引擎脚本相关/changeFormFieldTypeUsingGET
export default function fetchMethod(params: { appSystemType: string; enterpriseId?: number; fieldCode: string; toFormFieldType: string }, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/flow-service/flowPathScript/changeFormFieldType",
            method: "get",
            params,
        },
        extraOptions,
    );
}
// JSONResult«object»
export interface IJSONResultobject {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: Record<string, any>;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
