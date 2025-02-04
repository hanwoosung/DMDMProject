import axios from "axios";
import fetchReissue from "./fetchReissue";

let reissueAttempted = false;

const fetchAuthorizedPage = async (url, navigate, location) => {
    try {
        let accessToken = window.localStorage.getItem("access");

        if (!accessToken) {
            console.warn("🔹 Access Token 없음 → Refresh Token으로 재발급 시도");

            const reissueSuccess = await fetchReissue();
            if (reissueSuccess) {
                console.log("🔹 Access Token 재발급 성공, 다시 요청");
                accessToken = window.localStorage.getItem("access");
            } else {
                console.error("🔹 Refresh Token 만료 또는 재발급 실패 → 로그아웃 처리");
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                navigate("/logout", {state: location.pathname});
                return null;
            }
        }

        if (!accessToken) {
            console.warn("🔹 Access Token이 없음 → 로그아웃 처리");
            alert("로그인이 필요합니다.");
            navigate("/logout", {state: location.pathname});
            return null;
        }

        const response = await axios.post(url, {}, {
            headers: {
                "access": accessToken
            },
            withCredentials: true
        });

        console.log("🔹 권한 페이지 접근 성공:", response);
        return response.data;

    } catch (error) {
        if (error.response) {
            const {status} = error.response;

            if (status === 403) {
                console.error("🔹 403 Forbidden 발생! 권한이 없습니다.");
                alert("권한이 없습니다. 이전 페이지로 이동합니다.");
                if (window.history.length > 1) {
                    navigate(-1);
                } else {
                    navigate("/main");
                }
                return null;
            }

            if (status === 401) {
                console.warn("🔹 401 Unauthorized 발생, 재발급 시도 중...");

                if (!reissueAttempted) {
                    reissueAttempted = true;
                    const reissueSuccess = await fetchReissue();

                    if (reissueSuccess) {
                        console.log("🔹 Access Token 재발급 성공, 다시 요청");
                        return fetchAuthorizedPage(url, navigate, location);
                    } else {
                        console.error("🔹 Access Token 재발급 실패, 로그인 페이지로 이동");
                        alert("로그인이 필요합니다.");
                        navigate("/logout", {state: location.pathname});
                    }
                } else {
                    console.error("🔹 이미 재발급 시도했으나 실패, 로그인 페이지로 이동");
                    alert("로그인이 필요합니다.");
                    navigate("/logout", {state: location.pathname});
                }
            }
        } else {
            console.error("🔹 API 요청 중 오류 발생:", error);
            alert("서버와의 연결이 끊어졌습니다.");
            navigate("/logout");
        }
    }

    return null;
};

export default fetchAuthorizedPage;
