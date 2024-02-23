import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/库存统计（成品）日报表/getAreaSelectorUsingGET
export default function fetchMethod(extraOptions?: any) {
    return http<ITheJSONResultListAreaTreeReturnsVO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/baoJingReportProduceStorage/getAreaSelector",
            method: "get",
        },
        extraOptions,
    );
}
// JSONResult«List«区域树返回VO»»
export interface ITheJSONResultListAreaTreeReturnsVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IAreaTreeReturnsVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 区域树返回VO
export interface IAreaTreeReturnsVO {
    // id
    id: number;
    // 区域名称
    name: string;
    // 区域编号
    code: string;
    // 状态
    dataStatus: number;
    // 创建人
    createUserId: number;
    // 创建人姓名
    createUsername: string;
    // 创建时间
    createTime: string;
    // 区域子集
    children: IAreaTreeReturnsVO[];
}
