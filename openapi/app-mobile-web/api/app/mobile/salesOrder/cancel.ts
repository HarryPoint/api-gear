import { http } from '@/api/http';

// http://47.108.139.107:17400/doc.html#/default/销售订单相关/cancelUsingPOST_1
export default function fetchMethod(data: IIdInformation, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/app-mobile-web/api/app/mobile/salesOrder/cancel",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// id信息
export interface IIdInformation {
    // id
    id: number;
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