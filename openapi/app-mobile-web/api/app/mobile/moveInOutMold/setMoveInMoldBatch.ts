import { http } from '@/api/http';

// http://47.108.139.107:17400/doc.html#/default/进出料模具相关/setMoveInMoldBatchUsingPOST
export default function fetchMethod(data: IProductionTaskBatchSetFeedMoldRequestDTO, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/app-mobile-web/api/app/mobile/moveInOutMold/setMoveInMoldBatch",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 生产任务批量设置进料模具请求DTO
export interface IProductionTaskBatchSetFeedMoldRequestDTO {
    // 工序id
    processId: number;
    // 生产任务详情
    produceTaskDetails: IProductionTaskBatchSetFeedMoldTaskDetailsRequestDTO[];
    // 模具ids
    moldIds: number[];
}
// 生产任务批量设置进料模具任务详情请求DTO
export interface IProductionTaskBatchSetFeedMoldTaskDetailsRequestDTO {
    // 生产任务id
    produceTaskId: number;
    // 批次ids
    lotIds: number[];
    // undefined
    produceTechnologyMoldIds: number[];
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