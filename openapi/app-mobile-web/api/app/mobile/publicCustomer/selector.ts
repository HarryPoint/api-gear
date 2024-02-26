import { http } from '@/api/http';

// http://47.108.139.107:17400/doc.html#/default/CRM-公海池相关/searchPublicCustomerSelectorDataListUsingPOST_1
export default function fetchMethod(data: IPaging, extraOptions?: any) {
    return http<IJSONResultListIdNameNumberVO>(
        {
            url: "/app-mobile-web/api/app/mobile/publicCustomer/selector",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 分页
export interface IPaging {
    // ID 列表
    customerIdList: number[];
    // 当前页面
    pageNo: number;
    // 分页大小
    pageSize: number;
    // 排序字段集
    orders: IPagingSortVO[];
    // 客户名称，模糊匹配
    name: string;
    // 客户名称或Code，模糊匹配
    nameOrCode: string;
    // 是否包含销售用户，默认为 不包含(N)
    isContainSalesUser: string;
}
// 分页排序VO
export interface IPagingSortVO {
    // undefined
    column: string;
    // undefined
    isAsc: string;
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