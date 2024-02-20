// 宝晶物料主数据库存分布搜索VO
export interface IBaojingMaterialMasterDataInventoryDistributionSearchVO {
    // 物料id集
    materialIds: number[];
    // 当前页面
    pageNo: number;
    // 物料名称
    materialName: string;
    // 分页大小
    pageSize: number;
    // 编号
    materialCode: string;
    // 排序字段集
    orders: IPagingSortVO[];
    // 物料id
    materialId: number;
    // 仓库id
    storehouseIds: number[];
    // 仓位id集合
    warehouseIdList: number[];
    // 规格
    materialSpec: string;
    // 仓库用途
    storehousePurposeList: string[];
    // 仓位用途
    warehousePurposeList: string[];
}
// 分页排序VO
export interface IPagingSortVO {
    // undefined
    column: string;
    // undefined
    isAsc: string;
}
// JSONResult«List«宝晶物料库存分布返回VO»»
export interface IJSONResultListReturnTheInventoryDistributionToVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IBaojingMaterialInventoryDistributionReturnedToVO[];
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 宝晶物料库存分布返回VO
export interface IBaojingMaterialInventoryDistributionReturnedToVO {
    // 区域id
    areaId: number;
    // 区域名称
    areaName: string;
    // 区域编号
    areaCode: string;
    // 物料类型code
    materialType: string;
    // 物料类型
    materialTypeName: string;
    // 物料保管员
    materialCurator: string;
    // 仓库id
    storehouseId: number;
    // 仓库名称
    storehouseName: string;
    // 仓库编号
    storehouseCode: string;
    // 仓库用途
    storehousePurpose: string;
    // 仓位id
    warehouseId: number;
    // 仓位名称
    warehouseName: string;
    // 仓位编号
    warehouseCode: string;
    // 库存总数
    storageTotalCount: number;
    // 库存锁定数
    storageLockCount: number;
    // 库存可使用数
    storageUseCount: number;
}