import { http } from '@/api/http';

// http://47.108.139.107:16400/doc.html#/default/工序相关/getByIdsIgnoreStatusUsingPOST_3
export default function fetchMethod(data: IIdCollectionInformation, extraOptions?: any) {
    return http<ITheJSONResultListOperationSelectsToReturnVO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/process/getByIdsIgnoreStatus",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// id集合信息
export interface IIdCollectionInformation {
    // id集合
    ids: number[];
}
// JSONResult«List«工序选择返回VO»»
export interface ITheJSONResultListOperationSelectsToReturnVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IProcedureSelectionReturnsVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 工序选择返回VO
export interface IProcedureSelectionReturnsVO {
    // id
    id: number;
    // 工序名称
    name: string;
    // 工序编号
    code: string;
    // 区域id
    areaId: number;
    // 区域
    area: IRegionalVO;
}
// 区域VO
export interface IRegionalVO {
    // id
    id: number;
    // 区域名称
    name: string;
    // 区域编号
    code: string;
    // 父级id
    parentId: number;
}