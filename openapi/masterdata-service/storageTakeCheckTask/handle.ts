// 盘点任务盘点处理DTO
export interface I盘点任务盘点处理DTO {
    // 编辑模式 -- (暂存就传递STAGING, 提交就传递 DEFAULT)
    editType: string;
    // 任务id
    id: number;
    // 盘点明细
    detailList: 盘点任务盘点处理详情DTO[];
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
