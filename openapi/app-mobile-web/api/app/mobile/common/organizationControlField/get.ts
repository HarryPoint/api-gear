import { http } from '@/api/http';

// http://47.108.139.107:17400/doc.html#/default/公共相关/getOrganizationControlFieldsUsingGET
export default function fetchMethod(params: { flowPathCode: string }, extraOptions?: any) {
    return http<IJSONResultListOrganizationControlFieldVO>(
        {
            url: "/app-mobile-web/api/app/mobile/common/organizationControlField/get",
            method: "get",
            params,
        },
        extraOptions,
    );
}
// JSONResult«List«OrganizationControlFieldVO»»
export interface IJSONResultListOrganizationControlFieldVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IOrganizationControlFieldVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// OrganizationControlFieldVO
export interface IOrganizationControlFieldVO {
    // id
    id: number;
    // 所属流程id
    appId: number;
    // 编码
    code: string;
    // 序列
    serialNo: string;
    // 名称
    name: string;
    // 排序
    sort: number;
    // 类型
    type: string;
    // 组织类型
    organizationType: string;
    // 是否是表格内字段
    isTableField: string;
    // 父级流程表单id
    parentFlowPathFormFieldId: number;
    // 父级流程表单编码
    parentFlowPathFormFieldCode: string;
    // 父级流程表单名称
    parentFlowPathFormFieldName: string;
}
