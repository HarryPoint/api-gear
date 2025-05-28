import { apiFetch } from "@/base/utils/request";

/**
 * 迁移lylo&kinto用户和角色
 * @desc
 */
export function POST(options: {}, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/migrate",
        method: "POST",
        ...options,
    }, extraOptions)
}
