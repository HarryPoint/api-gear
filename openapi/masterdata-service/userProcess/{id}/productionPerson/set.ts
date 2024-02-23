import { http } from '@/api/http';

// http://47.108.139.107:16700/doc.html#/default/员工工序相关/setProductionPersonUsingPOST
export default function fetchMethod(data: ISetExecutorDTO[], extraOptions?: any) {
    return http<IJSONResultstring1>(
        {
            url: "/masterdata-service/userProcess/{id}/productionPerson/set",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// SetExecutorDTO
export interface ISetExecutorDTO {
    // undefined
    executorType: string;
    // undefined
    refIdList: number[];
}
// JSONResult«string»_1
export interface IJSONResultstring1 {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: string;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
