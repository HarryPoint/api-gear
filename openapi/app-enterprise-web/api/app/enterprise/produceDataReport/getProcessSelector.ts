import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/产出报表(产出数据相关)相关/getProcessSelectorUsingGET_6
export default function fetchMethod(extraOptions?: any) {
    return http<IJSONResultListIdNameNumberVO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/produceDataReport/getProcessSelector",
            method: "get",
        },
        extraOptions,
    );
}
// JSONResult«List«Id，名称，编号VO»»
export interface IJSONResultListIdNameNumberVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IIdNameNumberVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// Id，名称，编号VO
export interface IIdNameNumberVO {
    // id
    id: number;
    // 名称
    name: string;
    // 编号
    code: string;
}