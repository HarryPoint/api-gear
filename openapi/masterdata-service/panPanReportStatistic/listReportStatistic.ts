// 盼盼上报统计查询对象
export interface I盼盼上报统计查询对象 {
    // 查询开始时间 yyyy-MM-dd HH:mm:ss
    beginTime: string;
    // 查询结束时间 yyyy-MM-dd HH:mm:ss
    endTime: string;
    // 物料id集合
    materialIds: number[];
    // 工序id集合
    processIds: number[];
}
// JSONResult«List«盼盼上报统计响应对象»»
export interface IJSONResultList盼盼上报统计响应对象 {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 盼盼上报统计响应对象[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
