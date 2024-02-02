// 流程任务回退DTO
export interface I流程任务回退DTO {
    // 任务ID
    id: number;
    // 审批意见/执行情况
    notes: string;
    // 表单数据
    data;
    // 回退节点id
    backFlowPathNodeId: number;
    // 下个节点执行员工ID列表
    nextNodeExecutorEmployeeIdList: number[];
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
