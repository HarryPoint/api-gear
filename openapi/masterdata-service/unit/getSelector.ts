// JSONResult«List«Id，名称VO»»
export interface IJSONResultListIdNameVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IIdNameVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// Id，名称VO
export interface IIdNameVO {
    // id
    id: number;
    // 名称
    name: string;
}
