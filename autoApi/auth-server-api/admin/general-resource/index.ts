import { apiFetch } from "@/base/utils/request";

/**
 * 获取通用资源列表
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/general-resource",
        method: "GET",
        ...options,
    }, extraOptions)
}

/**
 * 创建通用资源
 * @desc
 */
export function POST(options: { data: { name: string, type: string, remark: string, value: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/general-resource",
        method: "POST",
        ...options,
    }, extraOptions)
}
