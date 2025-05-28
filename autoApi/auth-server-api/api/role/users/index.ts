import { apiFetch } from "@/base/utils/request";

/**
 * 获取角色相关的用户
 * @desc
 */
export function GET(options: { params?: { page_number?: number, page_size?: number, role_names?: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/role/users",
        method: "GET",
        ...options,
    }, extraOptions)
}
