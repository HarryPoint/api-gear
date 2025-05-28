import { apiFetch } from "@/base/utils/request";

/**
 * 微软账号登陆 - 获取授权页面
 * @desc
 */
export function GET(options: { params?: { redirect_uri?: string, tenant_redirect_uri?: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/login/ms/auth-code-url",
        method: "GET",
        ...options,
    }, extraOptions)
}
