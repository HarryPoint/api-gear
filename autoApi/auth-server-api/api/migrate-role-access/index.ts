import { apiFetch } from "@/base/utils/request";

/**
 * 迁移角色的权限
 * @desc
 */
export function POST(options: { headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/migrate-role-access",
        method: "POST",
        ...options,
    }, extraOptions)
}
