import { http } from '@/api/http';

// http://47.108.139.107:16700/doc.html#/default/销售订单相关/doBatchTransferToProduceOrderUsingPOST
export default function fetchMethod(data: IBatchTransferToProductionOrder, extraOptions?: any) {
    return http<IJSONResultSalesOrderToProductionOrderReturnedToDTO>(
        {
            url: "/masterdata-service/salesOrder/transferToProduceOrder/do",
            method: "post",
            data,
        },
        extraOptions,
    );
}
// 批量转到生产订单
export interface IBatchTransferToProductionOrder {
    // 是否生产订单继承销售订单编号
    isExtendSalesOrderCode: string;
    // 转生产订单数据列表
    transferToProduceOrderDataList: ISalesOrderToProductionOrderSubmaterialProductionInformationDTO[];
}
// 销售订单转生产订单子物料生产信息DTO
export interface ISalesOrderToProductionOrderSubmaterialProductionInformationDTO {
    // 详情id
    id: number;
    // 生产交付数量
    produceTotalCount: number;
    // 订单类型
    orderType: string;
    // 订单优先级，数值越大优先级越高
    priorityLevel: number;
    // 计划开始时间 yyyy-MM-dd HH:mm:ss
    beginTime: string;
    // 计划结束时间 yyyy-MM-dd HH:mm:ss
    endTime: string;
    // 层级
    level: number;
    // 对应批次订单集合
    lotOrders: IBatchEditDTO[];
    // 子物料生产信息
    childMaterialProduces: ISubProductionOrderConfigurationRequest[];
    // 不需要生产物料的-标准工艺节点ID列表
    notNeedProduceMaterialStandardTechnologyNodeIdList: number[];
    // 下单业务部门id
    placeOrderDepartmentId: number;
    // 下单业务部门编码
    placeOrderDepartmentCode: string;
    // 下单业务部门名称
    placeOrderDepartmentName: string;
    // 是否紧急的单子
    isEmergentOrder: string;
    // 交付日期 yyyy-MM-dd HH:mm:ss
    deliveryDate: string;
    // 标准工艺ID
    standardTechnologyId: number;
    // 产线
    productionLineId: number;
}
// 批次编辑DTO
export interface IBatchEditDTO {
    // id
    id: number;
    // 批次号
    lotNo: string;
    // 批次名称
    lotName: string;
    // 总数量
    totalCount: number;
}
// 子生产订单配置请求
export interface ISubProductionOrderConfigurationRequest {
    // 标准工艺路径，节点ID
    standardTechnologyNodeId: number;
    // 订单优先级，数值越大优先级越高
    priorityLevel: number;
    // 总生产数量
    totalCount: number;
    // 计划开始时间 yyyy-MM-dd HH:mm:ss
    beginTime: string;
    // 计划结束时间 yyyy-MM-dd HH:mm:ss
    endTime: string;
    // 产线
    productionLineId: number;
    // 批次信息列表
    lotOrders: IBatchEditDTO[];
}
// JSONResult«销售订单转生产订单返回DTO»
export interface IJSONResultSalesOrderToProductionOrderReturnedToDTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: ISalesOrderToProductionOrderReturnedToDTO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 销售订单转生产订单返回DTO
export interface ISalesOrderToProductionOrderReturnedToDTO {
    // 匹配任务id
    matchTaskId: number;
    // 生产订单ids
    produceOrderIds: number[];
}
