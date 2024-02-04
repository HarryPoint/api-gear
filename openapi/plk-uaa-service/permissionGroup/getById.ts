// Id 信息
export interface IIdInformation {
    // id
    id: number;
}
// JSONResult«权限组及权限响应 DTO»
export interface IJSONResultPermissionGroupAndPermissionResponseDTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IPermissionGroupsAndPermissionResponseDtos;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 权限组及权限响应 DTO
export interface IPermissionGroupsAndPermissionResponseDtos {
    // id
    id: number;
    // 编码
    code: string;
    // 名称
    name: string;
    // 权限码id集
    permissionIds: number[];
}
