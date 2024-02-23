import { http } from '@/api/http';

// http://47.108.139.107:16700/doc.html#/default/文件分类相关/getUserTreeListUsingGET
export default function fetchMethod(extraOptions?: any) {
    return http<IJSONResultListFileClassificationDetailsResponseDTO2>(
        {
            url: "/masterdata-service/fileCategory/getUserTreeList",
            method: "get",
        },
        extraOptions,
    );
}
// JSONResult«List«文件分类明细响应DTO»»_2
export interface IJSONResultListFileClassificationDetailsResponseDTO2 {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IFileClassificationDetailsRespondToDTO6[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 文件分类明细响应DTO_6
export interface IFileClassificationDetailsRespondToDTO6 {
    // ID
    id: number;
    // 分类名称
    name: string;
    // 上级ID
    parentId: number;
    // 创建人ID
    createUserId: number;
    // 下级树列表
    childList: IFileClassificationDetailsRespondToDTO6[];
    // 用户权限列表
    userPermissionList: string[];
}
