import { apiFetch } from "@/base/utils/request";

/**
 * 获取菜单详情
 * @desc
 */
export function GET(options: { path: { id: string }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/menu-resource/{id}",
        method: "GET",
        ...options,
    }, extraOptions)
}

/**
 * 更新
 * @desc
 */
export function POST(options: { path: { id: string }, data: { id: number, created_at: string, updated_at: string, pid: number, name: string, path: string, icon: string, type: number, sort_seq: number, children: { id?: number, created_at?: string, updated_at?: string, pid?: number, name?: string, path?: string, icon?: string, type?: number, sort_seq?: number }[], buttons: { id?: number, created_at?: string, updated_at?: string, pid?: number, name?: string, path?: string, icon?: string, type?: number, sort_seq?: number }[] }, headers?: { Authorization?: string, "tenant-key"?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/admin/menu-resource/{id}",
        method: "POST",
        ...options,
    }, extraOptions)
}
