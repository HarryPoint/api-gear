import { http } from '@/api/http';

// http://47.108.139.107:16700/doc.html#/default/生产异常类型相关/exportUsingPOST_13
export default function fetchMethod(data: IExceptionTypeSearchVO, params: { enterpriseId: number }, extraOptions?: any) {
    return http<IJSONResultlong>(
        {
            url: "/masterdata-service/produceAbnormalCategory/export",
            method: "post",
            data,
            params,
        },
        extraOptions,
    );
}
// 异常类型搜索VO
export interface IExceptionTypeSearchVO {
    // 当前页面
    pageNo: number;
    // 编号
    code: string;
    // 分页大小
    pageSize: number;
    // 排序字段集
    orders: IPagingSortVO[];
    // 名称
    name: string;
    // 类型
    type: string;
    // 数据状态
    dataStatus: number;
}
// 分页排序VO
export interface IPagingSortVO {
    // undefined
    column: string;
    // undefined
    isAsc: string;
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
