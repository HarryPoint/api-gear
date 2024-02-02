// ProposalDashboardConfigRequestDTO
export interface IProposalDashboardConfigRequestDTO {
    // ID
    id: number;
    // 建议部门ID列表
    proposalDepartmentIdList: number[];
    // 项目部门ID列表
    projectDepartmentIdList: number[];
    // 未完成目标值
    unCompleteTargetValue: number;
    // 已完成目标值
    completeTargetValue: number;
    // 未完成项目数量的统计区间配置
    unCompleteProjectDashboardStatisticsConfigList: ProposalDashboardStatisticsConfigRequestDTO[];
    // 已完成项目数量的统计区间配置
    completedProjectDashboardStatisticsConfigList: ProposalDashboardStatisticsConfigRequestDTO[];
}
// JSONResult«long»
export interface IJSONResultlong {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: number;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
