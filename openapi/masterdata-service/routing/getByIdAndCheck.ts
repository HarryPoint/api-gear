// JSONResult«RoutingDeprecatedVO»
export interface IJSONResultRoutingDeprecatedVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IRoutingDeprecatedVO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// RoutingDeprecatedVO
export interface IRoutingDeprecatedVO {
    // id
    id: number;
    // 所属企业id
    enterpriseId: number;
    // 工艺路径编码
    code: string;
    // 工艺路径名称
    name: string;
    // 所属主物料id
    materialId: number;
    // 所属主物料bomid
    materialBomId: number;
    // 是否默认
    isDefault: string;
}