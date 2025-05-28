import { apiFetch } from "@/base/utils/request";

/**
 * 获取菜单-树型
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/menu-resource/tree",
        method: "GET",
        ...options,
    }, extraOptions)
}
