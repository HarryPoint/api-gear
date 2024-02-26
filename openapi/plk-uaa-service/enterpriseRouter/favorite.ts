import { http } from '@/api/http';

// http://47.108.139.107:18100/doc.html#/default/企业路由相关/favoriteUsingPOST
export default function fetchMethod(data: IEnterpriseRoutingCollectionRequestDTO, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/plk-uaa-service/enterpriseRouter/favorite",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 企业路由收藏请求 DTO
export interface IEnterpriseRoutingCollectionRequestDTO {
    // 路由id
    id: number;
    // 客户端组编码
    clientGroupCode: string;
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