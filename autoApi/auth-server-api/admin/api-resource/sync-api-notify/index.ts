import { apiFetch } from "@/base/utils/request";

/**
 * 同步接口
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/api-resource/sync-api-notify",
        method: "GET",
        ...options,
    }, extraOptions)
}
