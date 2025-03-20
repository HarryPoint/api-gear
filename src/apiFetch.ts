import axios from "axios";

export const apiFetch = <T = any>(options: {url: string, method: "GET" | "POST" | "PUT" | "DELETE", path?: Record<string, string>, params?: Record<string, any>, data?: Record<string, any>}, extraOptions?: any ) => {
    let { path = {}, url = "", method, params, data} = options;
    Object.keys(path).forEach((key) => {
        url = url?.replace(new RegExp(`{${key}}`, 'g'), path[key] ?? '');
    });
    return axios<T>({
        url,
        method,
        params,
        data
    })
}