// 日历排班VO
export interface ICalendarSchedulingVO {
    // 排班天数集
    scheduleDays: ICalendarSchedulingDaysVO[];
    // 开始日期 yyyy-MM-dd
    beginDate: string;
    // 循环天数
    loopDay: number;
}
// 日历排班天数VO
export interface ICalendarSchedulingDaysVO {
    // 排班明细
    scheduleDayDetails: ICalendarScheduleDaysDetailsVO[];
}
// 日历排班天数明细VO
export interface ICalendarScheduleDaysDetailsVO {
    // 班组id集合
    classGroupIdList: number[];
    // 班次id
    classShiftId: number;
}
// JSONResult«object»
export interface IJSONResultobject {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
