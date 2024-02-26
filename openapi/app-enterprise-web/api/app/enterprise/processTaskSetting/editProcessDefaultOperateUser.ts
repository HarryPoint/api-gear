import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/工序任务设置相关/editProcessDefaultOperateUserUsingPOST
export default function fetchMethod(data: IProcedureTaskSettingDefaultOperatorEditsDTO, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/app-enterprise-web/api/app/enterprise/processTaskSetting/editProcessDefaultOperateUser",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 工序任务设置默认操作员编辑DTO
export interface IProcedureTaskSettingDefaultOperatorEditsDTO {
    // 员工类型
    userType: string;
    // 工序id
    processId: number;
    // 默认操作员ids
    defaultUserIds: number[];
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