import { apiFetch } from "@/base/utils/request";

/**
 * 登出
 * @desc
 */
export function POST(options: { headers?: { Authorization?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/logout",
        method: "POST",
        ...options,
    }, extraOptions)
}
