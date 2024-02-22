// JSONResult«List«上一次进料录入bom消耗响应DTO»»
export interface IJSONResultListRespondsToTheDTOForTheLastInputBom {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: ILastInputBomConsumesResponseDTO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 上一次进料录入bom消耗响应DTO
export interface ILastInputBomConsumesResponseDTO {
    // 对应物料id
    materialId: number;
    // 对应物料名称
    materialName: string;
    // 对应物料编号
    materialCode: string;
    // 单位消耗
    totalConsumeCount: number;
    // 物料实际消耗数
    actualQuantity: number;
    // 批次信息
    lotOrders: ILastInputBomConsumesBatchResponseDTO[];
    // 外部码
    externalCodes: string[];
}
// 上一次进料录入bom消耗批次响应DTO
export interface ILastInputBomConsumesBatchResponseDTO {
    // 批次id
    lotOrderId: number;
    // 批次编号
    lotOrderCode: string;
}