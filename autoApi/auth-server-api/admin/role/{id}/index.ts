import { apiFetch } from "@/base/utils/request";

/**
 * 删除角色
 * @desc
 */
export function DELETE(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/role/{id}",
        method: "DELETE",
        ...options,
    }, extraOptions)
}
