import { apiFetch } from "@/base/utils/request";

/**
 * 微软账号登陆 - 使用授权吗获取用户信息后注册/登陆
 * @desc
 */
export function POST(options: { data: { auth_code: string, redirect_uri: string, tenant_redirect_uri: string } }, extraOptions?: any) {
    return apiFetch<{}>({
        url: "/api/user/login/ms/auth",
        method: "POST",
        ...options,
    }, extraOptions)
}
