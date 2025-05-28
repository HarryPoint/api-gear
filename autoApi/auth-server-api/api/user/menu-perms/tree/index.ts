import { apiFetch } from "@/base/utils/request";

/**
 * 获取用户的菜单权限树
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/menu-perms/tree",
        method: "GET",
        ...options,
    }, extraOptions)
}
