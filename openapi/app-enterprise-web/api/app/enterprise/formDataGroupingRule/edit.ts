import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/表单数据分组规则相关/editGroupingUsingPOST
export default function fetchMethod(data: IFormDataGroupingSettingsAreRelated, params: { id: number }, extraOptions?: any) {
    return http<IJSONResultstring>(
        {
            url: "/app-enterprise-web/api/app/enterprise/formDataGroupingRule/edit",
            method: "post",
            data,
            params,
        },
        extraOptions,
    );
}
// 表单数据分组设置相关
export interface IFormDataGroupingSettingsAreRelated {
    // ID
    id: number;
    // 应用ID
    flowPathId: number;
    // 分组字段序列号
    groupingFieldSerialNo: Record<string, any>[];
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