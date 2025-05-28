import { apiFetch } from "@/base/utils/request";

/**
 * 获取菜单的按钮
 * @desc
 */
export function GET(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/menu-resource/{id}/buttons",
        method: "GET",
        ...options,
    }, extraOptions)
}
