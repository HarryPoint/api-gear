// JSONResult«项目模板项目信息响应DTO»
export interface IJSONResultProjectTemplateProjectInformationRespondsToTheDTO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IProjectTemplateProjectInformationRespondsToTheDTO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// 项目模板项目信息响应DTO
export interface IProjectTemplateProjectInformationRespondsToTheDTO {
    // 项目模板id
    projectTemplateId: number;
    // 项目数据
    projectData: any;
    // 项目取值字段
    projectExtractDataFields: IIdCodeNameGenericTransportObject[];
}
// Id Code Name 通用传输对象
export interface IIdCodeNameGenericTransportObject {
    // id
    id: number;
    // code
    code: string;
    // name
    name: string;
}