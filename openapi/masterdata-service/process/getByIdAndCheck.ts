// JSONResult«ProcessDeprecatedVO»
export interface IJSONResultProcessDeprecatedVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IProcessDeprecatedVO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// ProcessDeprecatedVO
export interface IProcessDeprecatedVO {
    // id
    id: number;
    // 所属企业id
    enterpriseId: number;
    // 所属区域id
    areaId: number;
    // 工序名称
    name: string;
    // 工序编号
    code: string;
    // 准备时间
    readyTime: number;
    // 准备时间单位
    readyTimeUnit: string;
    // 生产时间
    produceTime: number;
    // 生产时间单位
    produceTimeUnit: string;
    // 产出数量
    produceQuantity: number;
    // 准备工费（元）
    readyPrice: number;
    // 合格产出工费（元）
    producePrice: number;
    // 返工产出工费（元）
    backProducePrice: number;
}