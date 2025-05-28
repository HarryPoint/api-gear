import { apiFetch } from "@/base/utils/request";

/**
 * 删除权限数据
 * @desc
 */
export function POST(options: { data: { tenants: string[] }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/clear-access",
        method: "POST",
        ...options,
    }, extraOptions)
}
