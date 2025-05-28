import { apiFetch } from "@/base/utils/request";

/**
 * 获取租户列表
 * @desc
 */
export function GET(options: { params?: { page_number?: number, page_size?: number }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/tenant-profile",
        method: "GET",
        ...options,
    }, extraOptions)
}
