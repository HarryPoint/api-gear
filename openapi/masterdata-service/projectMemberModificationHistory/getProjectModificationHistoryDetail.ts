// JSONResult«项目成员变更信息版本记录»
export interface IJSONResultProjectMemberChangeInformationVersionRecord {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IProjectMemberChangeInformationVersionRecord;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 项目成员变更信息版本记录
export interface IProjectMemberChangeInformationVersionRecord {
    // undefined
    appId: number;
    // undefined
    modificationId: number;
    // undefined
    dataSnapshot: undefined[];
}
