// 进料设备查询DTO
export interface I进料设备查询DTO {
    // 生产任务ids
    produceTaskIds: number[];
    // 名称或者编号
    nameOrCode: string;
}
// JSONResult«List«进料设备响应DTO»»
export interface IJSONResultList进料设备响应DTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 进料设备响应DTO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
