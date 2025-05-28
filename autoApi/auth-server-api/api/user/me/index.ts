import { apiFetch } from "@/base/utils/request";

/**
 * 获取个人信息
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/me",
        method: "GET",
        ...options,
    }, extraOptions)
}
