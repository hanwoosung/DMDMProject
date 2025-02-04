import fetchReissue from "./fetchReissue";

let reissueAttempted = false;

const fetchAuthorizedPage = async (url, navigate, location) => {
    try {
        let accessToken = window.localStorage.getItem("access");

        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "access": accessToken
            },
        });

        if (response.ok) {
            console.log("🔹 권한 페이지 접근 성공:", url);
            return await response.text();
        } else if (response.status === 403) {
            console.error("🔹 403 Forbidden 발생! 권한이 없습니다.");
            alert("권한이 없습니다. 이전 페이지로 이동합니다.");
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate("/main");
            }
            return null;
        } else if (response.status === 401) {
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
                    navigate("/login", {state: location.pathname});
                }
            } else {
                console.error("🔹 이미 재발급 시도했으나 실패, 로그인 페이지로 이동");
                alert("로그인이 필요합니다.");
                navigate("/login", {state: location.pathname});
            }
        }

    } catch (error) {
        console.error("🔹 API 요청 중 오류 발생:", error);
    }

    return null; // ✅ 반환값이 없으면 `undefined`가 되므로 `null`을 명시적으로 반환
};

export default fetchAuthorizedPage;
