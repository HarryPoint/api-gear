import { http } from '@/api/http';

/**
* @link http://47.108.139.107:18100/doc.html#/default/员工相关/getEmployeeUserRpInfoUsingPOST
*/
export default function fetchMethod(data: IEmployeeUserAssociationInformationQuery, extraOptions?: any) {
    return http<IJSONResultEmployeeUserAssociationMessageResponse>(
        {
            url: "/plk-uaa-service/employee/getEmployeeUserRpInfo",
            method: "post",
            data,
        },
        extraOptions,
    );
}
/** 员工用户关联信息查询 */
export interface IEmployeeUserAssociationInformationQuery {
    /** 员工id */
    employeeId: number;
    /** 应用级别 */
    applicationLevel: string;
    /** 服务对象ID */
    serviceObjectId: number;
}
/** JSONResult«员工用户关联信息响应» */
export interface IJSONResultEmployeeUserAssociationMessageResponse {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: IEmployeeUserAssociationInformationResponse;
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
/** 员工用户关联信息响应 */
export interface IEmployeeUserAssociationInformationResponse {
    /** 员工id */
    employeeId: number;
    /** 是否允许登录 */
    isAllowLogin: string;
    /** 角色集 */
    roles: IRoleMessageResponse[];
    /** 用户id */
    userId: number;
    /** 用户手机号 */
    userTelephone: string;
}
/** 角色信息响应 */
export interface IRoleMessageResponse {
    /** 数据状态 */
    dataStatus: number;
    /** 创建人id */
    createUserId: number;
    /** 创建人名称 */
    createUsername: string;
    /** 创建时间 */
    createTime: string;
    /** 更新人id */
    updateUserId: number;
    /** 更新人名称 */
    updateUsername: string;
    /** 更新时间 */
    updateTime: string;
    /** id */
    id: number;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 是否是超级管理员 */
    isManage: string;
    /** 是否是管理员 */
    isAdmin: string;
    /** 描述 */
    description: string;
    /** 应用级别 */
    applicationLevel: string;
    /** 服务对象ID */
    serviceObjectId: number;
    /** 服务业务ID */
    serviceBusinessId: number;
}
