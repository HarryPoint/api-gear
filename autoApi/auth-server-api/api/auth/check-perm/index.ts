import { apiFetch } from "@/base/utils/request";

/**
 * 鉴权
 * @desc
 */
export function GET(options: { headers?: { "X-Forwarded-Method"?: string, "X-Forwarded-Proto"?: string, "X-Forwarded-Host"?: string, "X-Forwarded-Uri"?: string, "X-Forwarded-For"?: string, Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/auth/check-perm",
        method: "GET",
        ...options,
    }, extraOptions)
}
