import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useFetch = (url, config = {}, method = "get") => {
    const BASE_API = "http://localhost:8090";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const memoConfig = useMemo(() => config, [JSON.stringify(config)]);

    useEffect(() => {
        if (!url) return;

        const loadData = async () => {
            const fullUrl = BASE_API + url;
            setLoading(true);
            setError(null);

            const httpMethods = {
                get: () => axios.get(fullUrl, { params: memoConfig.params, ...memoConfig }),
                post: () =>
                    axios.post(
                        fullUrl,
                        memoConfig.data, // 본문 데이터 전달
                        {
                            headers: { "Content-Type": "application/json" },
                            ...memoConfig,
                        }
                    ),
            };

            try {
                const request = httpMethods[method.toLowerCase()];
                if (!request) throw new Error(`HTTP method ${method} is not supported`);

                const response = await request();
                setData(response.data);
                console.log("Response data: ", response.data);
            } catch (e) {
                setError(e.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [url, memoConfig, method]);

    return { data, loading, error };
};

export default useFetch;
