import { http } from '@/api/http';

/**
* @link http://47.108.139.107:16400/doc.html#/default/质检管理/getWarehouseSelectorUsingGET
*/
export default function fetchMethod(params: { materialId?: number }, extraOptions?: any) {
    return http<IJSONResultListReturnsTheMaterialMasterDataStoreToVO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/qualityStorageTask/byMaterialId/getWarehouseSelector",
            method: "get",
            params,
        },
        extraOptions,
    );
}
/** JSONResult«List«物料主数据仓位返回VO»» */
export interface IJSONResultListReturnsTheMaterialMasterDataStoreToVO {
    /** 返回码 */
    code: number;
    /** 返回消息说明 */
    msg: string;
    /** 响应结果 */
    data: IMaterialMasterDataWarehouseReturnsToVO[];
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts: number;
}
/** 物料主数据仓位返回VO */
export interface IMaterialMasterDataWarehouseReturnsToVO {
    /** 仓位id */
    id: number;
    /** 仓位编码 */
    code: string;
    /** 仓位名称 */
    name: string;
    /** 物料id */
    materialId: number;
    /** 物料编号 */
    materialCode: string;
    /** 物料名称 */
    materialName: string;
}
