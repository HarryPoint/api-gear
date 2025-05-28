import { apiFetch } from "@/base/utils/request";

/**
 * 给角色赋予api权限
 * @desc
 */
export function POST(options: { path: { id: string }, data: { api_ids: number[] }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/role/{id}/apis",
        method: "POST",
        ...options,
    }, extraOptions)
}

/**
 * 获取角色的接口权限
 * @desc
 */
export function GET(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/role/{id}/apis",
        method: "GET",
        ...options,
    }, extraOptions)
}
