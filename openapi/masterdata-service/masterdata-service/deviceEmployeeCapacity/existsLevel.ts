// JSONResult«设备人员能力等级是否存在响应DTO»
export interface IJSONResultDevicePersonnelCapabilityLevelWhetherThereIsAResponseDTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IEquipmentPersonnelCapabilityLevelWhetherThereIsAResponseDTO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 设备人员能力等级是否存在响应DTO
export interface IEquipmentPersonnelCapabilityLevelWhetherThereIsAResponseDTO {
    // 是否存在
    isExist: string;
}
