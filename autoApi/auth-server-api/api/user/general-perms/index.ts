import { apiFetch } from "@/base/utils/request";

/**
 * 获取我的的通用资源权限
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/general-perms",
        method: "GET",
        ...options,
    }, extraOptions)
}
