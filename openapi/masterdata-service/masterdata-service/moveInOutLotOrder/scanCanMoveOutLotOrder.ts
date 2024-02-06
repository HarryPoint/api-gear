// 可进出料批次扫描查询dto
export interface IDtoCanBeCheckedByBatchScanning {
    // 生产任务id
    produceTaskId: number;
    // 编号
    code: string;
}
// JSONResult«可出料批次响应dto»
export interface IJSONResultReleasableBatchResponseDto {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IReleasableBatchResponseDto;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 可出料批次响应dto
export interface IReleasableBatchResponseDto {
    // 批次id
    id: number;
    // 批次号
    lotOrderCode: string;
    // 可出料数量
    canOptQuantity: number;
}