import { useState } from "react";
import axios from "axios";

/**
 * const { get, post, put, del, loading, error } = useApi(); << 여기서 필요없는건 제거 하고 사용 그리고 베이스 url 안받음
 * 사용 방법 : 이거보고 이제 묻지마셈
 * 1. GET 요청
 *    await get("/api/v1/example", {
 *        params: { key: "value" },
 *        headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 *
 * 2. POST 요청
 *    await post("/api/v1/example", {
 *        body: { key: "value", key: "value" },
 *        headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 *
 * 3. PUT 요청
 *    await put("/api/v1/example/1", {
 *        body: {key: "value" },
 *       headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 *
 * 4. DELETE 요청
 *    await del("/api/v1/example/1", {
 *        headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 */
const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8090"
    });

    const request = async (method, url, { params = {}, body = {}, headers = {} } = {}) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`%c[REQUEST] %c${method.toUpperCase()} %c${url}`,
                "color: #3498db; font-weight: bold;",
                "color: #2ecc71; font-weight: bold;",
                "color: #9b59b6; font-weight: bold;",
                { params, body });

            const response = await axiosInstance({
                method,
                url,
                params,
                data: body,
                headers,
            });

            console.log(`%c[RESPONSE] %c${method.toUpperCase()} %c${url}`,
                "color: #e67e22; font-weight: bold;",
                "color: #2ecc71; font-weight: bold;",
                "color: #9b59b6; font-weight: bold;",
                response.data);
            return response.data.body;

        } catch (err) {
            console.error(`%c[ERROR] %c${method.toUpperCase()} %c${url}`,
                "color: #e74c3c; font-weight: bold;",
                "color: #2ecc71; font-weight: bold;",
                "color: #9b59b6; font-weight: bold;",
                err.response || err.message);
            setError(err.response?.data?.message || "오류");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const get = (url, options = {}) => request("get", url, options);
    const post = (url, options = {}) => request("post", url, options);
    const put = (url, options = {}) => request("put", url, options);
    const del = (url, options = {}) => request("delete", url, options);

    return {
        loading,
        error,
        get,
        post,
        put,
        del,
    };
};

export default useApi;
