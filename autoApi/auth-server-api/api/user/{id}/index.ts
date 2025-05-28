import { apiFetch } from "@/base/utils/request";

/**
 * 获取用户信息
 * @desc
 */
export function GET(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/{id}",
        method: "GET",
        ...options,
    }, extraOptions)
}
