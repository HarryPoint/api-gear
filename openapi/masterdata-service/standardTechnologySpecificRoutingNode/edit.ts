// 标准工艺具体工艺路径节点编辑请求对象
export interface I标准工艺具体工艺路径节点编辑请求对象 {
    // 当前的标准工艺id, 创建标准工艺阶段 传递null, 编辑标准工艺阶段 传递编辑的标准工艺id
    standardTechnologyId: number;
    // 物料id
    materialId: number;
    // bomId
    bomId: number;
    // 工艺路径id --新增时传递为null, 修改时传递id
    routingId: number;
    // 工艺路径编号
    routingCode: string;
    // 工艺路径名称
    routingName: string;
    // 工艺路径详情列表
    detailList: 标准工艺具体工艺路径节点详情编辑请求对象[];
}
// JSONResult«工艺路径节点编辑响应对象»
export interface IJSONResult工艺路径节点编辑响应对象 {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: 工艺路径节点编辑响应对象;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
