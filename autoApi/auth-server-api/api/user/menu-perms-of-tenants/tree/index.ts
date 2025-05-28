import { apiFetch } from "@/base/utils/request";

/**
 * 获取所有租户的菜单权限列表-树型结构
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string } }, extraOptions?: any) {
    return apiFetch<{ code: number, message: string, data: { perms: { lylo: { allow: boolean, children: { id: number, pid: number, name: string, path: string, sort: number, allow: boolean, children: { id: number, pid: number, name: string, path: string, sort: number, allow: boolean, children: { id: number, pid: number, name: string, path: string, sort: number, allow: boolean, children: string[], any_allowed: boolean }[], any_allowed: boolean }[], any_allowed: boolean }[], any_allowed: boolean } } } }>({
        url: "/api/user/menu-perms-of-tenants/tree",
        method: "GET",
        ...options,
    }, extraOptions)
}
