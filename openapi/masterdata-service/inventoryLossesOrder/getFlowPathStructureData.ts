// 流程结构搜索VO
export interface IProcessStructureSearchVO {
    // 流程任务id
    flowPathTaskId: number;
    // 数据id
    id: number;
}
// JSONResult«表单结构VO»
export interface IJSONResultFormStructureVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 表单结构VO_1;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
