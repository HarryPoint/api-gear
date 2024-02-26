import { http } from '@/api/http';

/**
* @link http://47.108.139.107:18100/doc.html#/default/员工相关/addUsingPOST_4
*/
export default function fetchMethod(data: IEmployeeEditRequest, extraOptions?: any) {
    return http<IJSONResultobject>(
        {
            url: "/plk-uaa-service/employee/add",
            method: "post",
            data,
        },
        extraOptions,
    );
}
/** 员工编辑请求 */
export interface IEmployeeEditRequest {
    /** id */
    id: number;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 角色id集 */
    roleIds: number[];
    /** 部门id */
    departmentId: number;
    /** 手机号码 */
    telephone: string;
    /** 邮件 */
    email: string;
    /** 是否允许登录 */
    isAllowLogin: string;
    /** 是否处理账号信息 */
    isHandleAccount: string;
    /** 应用级别 */
    applicationLevel: string;
    /** 服务对象ID */
    serviceObjectId: number;
    /** 服务业务ID */
    serviceBusinessId: number;
}
/** JSONResult«object» */
export interface IJSONResultobject {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: Record<string, any>;
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
