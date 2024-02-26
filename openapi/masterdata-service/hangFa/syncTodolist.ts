import { http } from '@/api/http';

/**
* @link http://47.108.139.107:16700/doc.html#/default/航发相关/syncTodolistUsingPOST
*/
export default function fetchMethod(data: IKingdeeBacklogCreateRequest, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/masterdata-service/hangFa/syncTodolist",
            method: "post",
            data,
        },
        extraOptions,
    );
}
/** 金蝶待办创建请求 */
export interface IKingdeeBacklogCreateRequest {
    /** 待办id，需保证唯一 */
    id: string;
    /** 标题 */
    title: string;
    /** 待办内容 */
    content: string;
    /** 待办执行人 */
    employeeId: number;
    /** 跳转完整url */
    url: string;
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
