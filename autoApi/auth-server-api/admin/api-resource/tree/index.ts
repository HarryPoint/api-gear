import { apiFetch } from "@/base/utils/request";

/**
 * 获取接口列表-树型
 * @desc
 */
export function GET(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/api-resource/tree",
        method: "GET",
        ...options,
    }, extraOptions)
}
