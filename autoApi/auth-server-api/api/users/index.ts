import { apiFetch } from "@/base/utils/request";

/**
 * 获取用户列表
 * @desc
 */
export function GET(options: { params?: { page_number?: number, page_size?: number, filter?: string, sorter?: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/users",
        method: "GET",
        ...options,
    }, extraOptions)
}
