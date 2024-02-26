import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/生产订单相关/getLotOrderCanMargeUsingPOST_1
export default function fetchMethod(data: IBatchOrderVerificationCanMergeSearchVO, extraOptions?: any) {
    return http<IJSONResultIndicatesWhetherTheInformationIsDisplayed>(
        {
            url: "/app-enterprise-web/api/app/enterprise/produceOrder/getLotOrderCanMarge",
            method: "post",
            data,
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