import { apiFetch } from "@/base/utils/request";

/**
 * 获取角色的通用资源权限
 * @desc
 */
export function GET(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/role/{id}/general-resources",
        method: "GET",
        ...options,
    }, extraOptions)
}

/**
 * 保存角色的通用资源权限
 * @desc
 */
export function POST(options: { path: { id: string }, data: { resource_ids: number[] }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/role/{id}/general-resources",
        method: "POST",
        ...options,
    }, extraOptions)
}
