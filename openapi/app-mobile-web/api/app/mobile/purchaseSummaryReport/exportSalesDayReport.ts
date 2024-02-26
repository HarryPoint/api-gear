import { http } from '@/api/http';

// http://47.108.139.107:17400/doc.html#/default/采购汇总报表相关/exportSalesDayReportUsingPOST
export default function fetchMethod(data: ExportSalesDayReport, extraOptions?: any) {
    return http<IJSONResultlong>(
        {
            url: "/app-mobile-web/api/app/mobile/purchaseSummaryReport/exportSalesDayReport",
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