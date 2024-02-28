import { http } from "@/api/http";

/**
* @author 
* @link http://47.108.139.107:16400/doc.html#/default/设备数采数据方案相关/getParamSelectorUsingGET
*/
export default function fetchMethod(options: {} = {}, extraOptions?: any) {
    return http<IJSONResultListDeviceDataCollectionSelectVO>(
        {
            url: "/app-enterprise-web/api/app/enterprise/deviceCollectionPlan/getParamSelector",
            method: "GET",
            ...options,
        },
        extraOptions,
    );
}
/** JSONResult«List«设备数采选择VO»» */
export interface IJSONResultListDeviceDataCollectionSelectVO {
    /** 返回码 */
    code?: number;
    /** 返回消息说明 */
    msg?: string;
    /** 响应结果 */
    data?: IVOIsSelectedForDeviceDataAcquisition[];
    /** 服务器结果返回时的 Unix timestamp,单位毫秒 */
    ts?: string;
}
/** 设备数采选择VO */
export interface IVOIsSelectedForDeviceDataAcquisition {
    /** id */
    id: string;
    /** 名称 */
    name: string;
    /** 编号 */
    code: string;
    /** 数据类型(number数字 text文本) */
    dataType?: string;
    /** 单位类型(quantity数量 time时间) */
    unitType?: string;
    /** 单位 */
    unit: string;
}
