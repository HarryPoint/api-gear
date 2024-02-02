// 关键参数下拉选择列表搜索DTO
export interface I关键参数下拉选择列表搜索DTO {
    // 物料id
    materialId: number;
    // 工序id
    processId: number;
    // 关键参数名称
    keyParameterName: string;
}
// JSONResult«List«关键参数下拉选择列表搜索响应DTO»»
export interface IJSONResultList关键参数下拉选择列表搜索响应DTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 关键参数下拉选择列表搜索响应DTO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
