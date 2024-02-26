import { http } from '@/api/http';

// http://47.108.139.107:18100/doc.html#/default/服务相关/listUsingGET_3
export default function fetchMethod(extraOptions?: any) {
    return http<ITheJSONResultListServiceRespondsToTheDTO>(
        {
            url: "/plk-uaa-service/serve/list",
            method: "get",
        },
        extraOptions,
    );
}
// JSONResult«List«服务响应 DTO»»
export interface ITheJSONResultListServiceRespondsToTheDTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IServiceRespondsToDTO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 服务响应 DTO
export interface IServiceRespondsToDTO {
    // id
    id: number;
    // 编码
    code: string;
    // 名称
    name: string;
}