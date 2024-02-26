import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/CRM-商机销售统计报表相关/exportSalesStatisticsUsingPOST
export default function fetchMethod(data: number[], extraOptions?: any) {
    return http<IJSONResultlong>(
        {
            url: "/app-enterprise-web/api/app/enterprise/businessChance/salesStatistics/export",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// JSONResult«long»
export interface IJSONResultlong {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: number;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}