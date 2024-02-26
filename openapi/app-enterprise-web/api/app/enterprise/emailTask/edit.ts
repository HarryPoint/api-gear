import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/邮件任务/editUsingPOST_8
export default function fetchMethod(data: IEmailTaskEditRequestDTO, extraOptions?: any) {
    return http<IJSONResultstring>(
        {
            url: "/app-enterprise-web/api/app/enterprise/emailTask/edit",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// EmailTaskEditRequestDTO
export interface IEmailTaskEditRequestDTO {
    // ID
    id: number;
    // 邮件名称
    emailName: string;
    // 收件人
    addressee: string;
    // 标题
    title: string;
    // 邮件正文
    content: string;
    // 发送模式
    sendingMode: string;
    // 发送时间
    sendingTime: string;
    // 下次发送时间
    nextSendingTime: string;
    // 上次发送时间
    lastSendingTime: string;
    // 邮件任务配置列表
    attachmentConfigList: IEmailTaskAttachmentConfigEditRequestDTO[];
    // 邮件状态
    status: string;
    // 发送时间配置
    sendingTimeConfig: ISendingTimeConfigEditRequestDTO;
    // 创建用户名
    createUserName: string;
    // 更新用户名
    updateUserName: string;
    // 创建部门名
    createDeptName: string;
    // 更新部门名
    updateDeptName: string;
}
// EmailTaskAttachmentConfigEditRequestDTO
export interface IEmailTaskAttachmentConfigEditRequestDTO {
    // ID
    id: number;
    // 其他对象引用ID
    refId: number;
    // 文件类型
    fileType: string;
}
// SendingTimeConfigEditRequestDTO
export interface ISendingTimeConfigEditRequestDTO {
    // ID
    id: number;
    // 时间模式
    timeMode: string;
    // 周号
    weekNo: number;
    // 每月的计时模式
    monthCalcTimeMode: string;
    // 第几天
    day: number;
    // 季度计时模式
    quarterCalcTimeMode: string;
    // 每天第几天
    month: number;
    // 时间
    time: string;
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