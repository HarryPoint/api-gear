import { apiFetch } from "@/base/utils/request";

/**
 * 获取用户的通用资源权限
 * @desc
 */
export function GET(options: { path: { id: string }, headers?: { "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/{id}/general-perms",
        method: "GET",
        ...options,
    }, extraOptions)
}
