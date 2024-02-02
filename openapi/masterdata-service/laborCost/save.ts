// 工费保存DTO
export interface I工费保存DTO {
    // id
    id: number;
    // 编号
    code: string;
    // 名称
    name: string;
    // 关联工序id
    processIds: number[];
    // 关联物料id
    materialIds: number[];
    // 合格产出工费单价（元）
    producePrice: number;
    // 返工产出工费单价（元）
    backProducePrice: number;
    // 准备工费（元）
    readyPrice: number;
}
// JSONResult«工费响应对象»
export interface IJSONResult工费响应对象 {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 工费响应对象;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
