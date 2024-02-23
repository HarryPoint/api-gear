import { http } from '@/api/http';

// http://47.108.139.107:16700/doc.html#/default/生产批次订单相关/getLotOrderCanMargeUsingPOST
export default function fetchMethod(data: IBatchOrderVerificationCanMergeSearchVO, params: { enterpriseId: number }, extraOptions?: any) {
    return http<IJSONResultIndicatesWhetherTheInformationIsDisplayed>(
        {
            url: "/masterdata-service/lotOrder/getLotOrderCanMarge",
            method: "post",
            data,
            params,
        },
        extraOptions,
    );
}
// 批次订单校验能否合并搜索VO
export interface IBatchOrderVerificationCanMergeSearchVO {
    // 批次id集
    lotOrderIds: number[];
}
// JSONResult«是否信息»
export interface IJSONResultIndicatesWhetherTheInformationIsDisplayed {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IYesNoMessage;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 是否信息
export interface IYesNoMessage {
    // 是否
    whether: string;
}
