// DynamicFormDataUpdateRequestDTO
export interface IDynamicFormDataUpdateRequestDTO {
    // undefined
    tableRecordIdList: number[];
    // undefined
    appCode: string;
    // undefined
    detailTableCode: string;
    // undefined
    tableColumnSerialToValueListMap;
    // undefined
    idFieldSerialNoToValueListMap;
    // undefined
    isUpdateDetailTable: string;
}
// JSONResult«object»
export interface IJSONResultobject {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}