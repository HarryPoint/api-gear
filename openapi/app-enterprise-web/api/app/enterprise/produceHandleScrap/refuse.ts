import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/生产报废服务相关/refuseUsingPOST_1
export default function fetchMethod(data: IProductionProcessingScrapChangeStatusDTO, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/app-enterprise-web/api/app/enterprise/produceHandleScrap/refuse",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 生产处理报废变更状态DTO
export interface IProductionProcessingScrapChangeStatusDTO {
    // 生产处理id
    id: number;
    // 处理意见
    handleRemark: string;
}
// JSONResult«object»
export interface IJSONResultobject {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: Record<string, any>;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}