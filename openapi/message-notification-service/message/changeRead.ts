import { http } from '@/api/http';

/**
* @link http://47.108.139.107:17600/doc.html#/default/消息相关/changeReadUsingPOST
*/
export default function fetchMethod(data: IMessageChangeReadDTO, params: { clientCode: string; enterpriseId: number; userId: number }, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/message-notification-service/message/changeRead",
            method: "post",
            data,
            params,
        },
        extraOptions,
    );
}
/** 消息变更已读DTO */
export interface IMessageChangeReadDTO {
    /** 是否全部标记已读 */
    isAll: string;
    /** 单个标记id，isAll=N时必传 */
    id: number;
}
/** JSONResult«object» */
export interface IJSONResultobject {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: Record<string, any>;
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
