import { http } from '@/api/http';

// http://47.108.139.107:16700/doc.html#/default/项目任务相关/listPriorityUsingGET
export default function fetchMethod(extraOptions?: any) {
    return http<IJSONResultListIdCodeNameACommonTransferObject>(
        {
            url: "/masterdata-service/projectTask/listPriority",
            method: "get",
        },
        extraOptions,
    );
}
// JSONResult«List«Id Code Name 通用传输对象»»
export interface IJSONResultListIdCodeNameACommonTransferObject {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IIdCodeNameGenericTransportObject[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// Id Code Name 通用传输对象
export interface IIdCodeNameGenericTransportObject {
    // id
    id: number;
    // code
    code: string;
    // name
    name: string;
}
