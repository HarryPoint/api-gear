import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/初始化引擎 - 导入模板相关/downloadNewTemplateUsingGET
export default function fetchMethod(params: { id: number }, extraOptions?: any) {
    return http<any>(
        {
            url: "/app-enterprise-web/api/app/enterprise/initEngine/importTemplate/download",
            method: "get",
            params,
        },
        extraOptions,
    );
}