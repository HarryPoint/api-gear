import { get } from '@/api/http';
 
// http://47.108.139.107:16700/doc.html#/default/应收账款快照相关/getAccountsReceivableGroupDayUsingGET
export function fetchMethod(params: { day: string; enterpriseId: number }) {
    return get({
      url: "/masterdata-service/accountsReceivableSnapshot/getAccountsReceivableGroupDay",
      params,
    });
}
// JSONResult«AccountsReceivableVO»
export interface IJSONResultAccountsReceivableVO {
    // 返回码
    code: number;
    // 返回消息说明
    msg: string;
    // 响应结果
    data: IAccountsReceivableVO;
    // 服务器结果返回时的 Unix timestamp,单位毫秒
    ts: number;
}
// AccountsReceivableVO
export interface IAccountsReceivableVO {
    // undefined
    amountReceivable: number;
    // undefined
    amountReceived: number;
}