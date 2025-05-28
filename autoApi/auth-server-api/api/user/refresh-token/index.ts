import { apiFetch } from "@/base/utils/request";

/**
 * 刷新access token
 * @desc
 */
export function POST(options: { data: { refresh_token: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/refresh-token",
        method: "POST",
        ...options,
    }, extraOptions)
}
