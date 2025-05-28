import { apiFetch } from "@/base/utils/request";

/**
 * 获取通用资源详情
 * @desc
 */
export function GET(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/general-resource/{id}",
        method: "GET",
        ...options,
    }, extraOptions)
}

/**
 * 删除通用资源
 * @desc
 */
export function DELETE(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/general-resource/{id}",
        method: "DELETE",
        ...options,
    }, extraOptions)
}

/**
 * 更新通用资源
 * @desc
 */
export function POST(options: { path: { id: string }, data: { name: string, type: string, remark: string, value: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/general-resource/{id}",
        method: "POST",
        ...options,
    }, extraOptions)
}
