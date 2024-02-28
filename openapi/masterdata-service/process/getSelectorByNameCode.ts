import { http } from "@/api/http";

/**
* @author 
* @link http://47.108.139.107:16700/doc.html#/default/工序相关/getSelectorByNameCodeUsingGET
*/
export default function fetchMethod(options: { params: { enterpriseId?: string; nameOrCode?: string } }, extraOptions?: any) {
    return http<ITheJSONResultListOperationSelectsToReturnVO>(
        {
            url: "/masterdata-service/process/getSelectorByNameCode",
            method: "GET",
            ...options,
        },
        extraOptions,
    );
}
/** JSONResult«List«工序选择返回VO»» */
export interface ITheJSONResultListOperationSelectsToReturnVO {
    /** 返回码 */
    code?: number;
    /** 返回消息说明 */
    msg?: string;
    /** 响应结果 */
    data?: IProcedureSelectionReturnsVO[];
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts?: string;
}
/** 工序选择返回VO */
export interface IProcedureSelectionReturnsVO {
    /** id */
    id?: string;
    /** 工序名称 */
    name?: string;
    /** 工序编号 */
    code?: string;
    /** 区域id */
    areaId?: string;
    /** 区域 */
    area?: IRegionVO1;
}
/** 区域VO_1 */
export interface IRegionVO1 {
    /** id */
    id?: string;
    /** 区域名称 */
    name?: string;
    /** 区域编号 */
    code?: string;
    /** 父级id */
    parentId?: string;
}
