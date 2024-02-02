// DataLinkageCalcRequestDTO
export interface IDataLinkageCalcRequestDTO {
    // 表单字段ID
    flowPathFormFieldId: number;
    // 表单记录ID
    fromRecord;
}
// JSONResult«DataLinkageCalcResponseDTO»
export interface IJSONResultDataLinkageCalcResponseDTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: DataLinkageCalcResponseDTO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
