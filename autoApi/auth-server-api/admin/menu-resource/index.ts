import { apiFetch } from "@/base/utils/request";

/**
 * 创建菜单
 * @desc
 */
export function POST(options: { data: { name: string, path: string, icon: string, sort_seq: number, type: number, remark: string, children: { name: string, path: string, icon: string, sort_seq: number, type: number, remark: string }[], buttons: { name: string, remark: string }[] }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/menu-resource",
        method: "POST",
        ...options,
    }, extraOptions)
}
