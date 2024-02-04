// JSONResult«流程表单字段关联字典选项集VO»
export interface IJSONResultProcessFormFieldAssociationDictionaryOptionSetVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IProcessFormFieldAssociationDictionaryOptionSetVO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 流程表单字段关联字典选项集VO
export interface IProcessFormFieldAssociationDictionaryOptionSetVO {
    // undefined
    color: string;
    // undefined
    name: string;
    // 预设名称
    presetName: string;
    // undefined
    code: string;
    // 是否预设
    isPreset: string;
    // 能否修改
    isCanModify: string;
    // 能否删除
    isCanDelete: string;
}