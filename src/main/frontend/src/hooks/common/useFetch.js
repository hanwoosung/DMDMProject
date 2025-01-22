import {useEffect, useMemo, useState} from "react";
import axios from "axios";

/**
 * 사용방법
 * const { data, loading, error } = useFetch("https://김상준.황승현.최기환/살인!", {
 *   params: { page: 김상준이다, limit: 황승현이다 },
 *   headers: { 김상준의 머리: "김상준이 JWT 도입하면 사용할지도?" },
 * });
 *
 * const {event, loading} = useFetch("김상준날라가용~"); 파라미터 없을 때 요로코롬
 */
const useFetch = (url, config = {}) => {
    const BASE_API = "http://localhost:8090"
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const memoConfig = useMemo(() => config, [JSON.stringify(config)]);

    useEffect(() => {

        if (!url) return;
        const loadData = async () => {

            const fullUrl = BASE_API + url
            setLoading(true);
            setError(null);


            try {
                const response = await axios.get(fullUrl, {...memoConfig});
                setData(response.data.body);
                console.log("리스폰 데이터: ", response.data);
            } catch (e) {
                setError(e.message || "뭔가 에러뜸");
            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, [url, memoConfig]);

    return {data, loading, error};
};

export default useFetch;
