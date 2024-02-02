// 物料实时库存查询返回VO
export interface I物料实时库存查询返回VO {
    // 物料ids
    materialIds: number[];
    // 仓库ids
    storehouseIds: number[];
    // 仓库类型
    warehouseTypes: string[];
}
// JSONResult«List«物料实时库从返回VO»»
export interface IJSONResultList物料实时库从返回VO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 物料实时库从返回VO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
