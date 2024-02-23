import { http } from '@/api/http';

// http://47.108.139.107:17600/doc.html#/default/邮件任务/completeFileProvisionUsingPOST
export default function fetchMethod(data: IFileProvisionCompleteRequestDTO, extraOptions?: any) {
    return http<IJSONResultstring>(
        {
            url: "/message-notification-service/emailTask/completeFileProvision",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// FileProvisionCompleteRequestDTO
export interface IFileProvisionCompleteRequestDTO {
    // 邮件记录ID
    mailRecordId: number;
}
// JSONResult«string»
export interface IJSONResultstring {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: string;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
