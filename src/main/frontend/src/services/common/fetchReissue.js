import { Cookies } from "react-cookie";

const fetchReissue = async () => {
    const cookies = new Cookies();

    try {
        const response = await fetch("http://localhost:8090/reissue", {
            method: "POST",
            credentials: "include",
        });

        console.log("🔹 Reissue 요청 응답:", response);

        if (response.status === 401) {
            console.error("🔹 Refresh Token 만료됨! 쿠키 삭제 및 로그아웃 처리.");
            cookies.remove("refresh");
            window.localStorage.removeItem("access");
            window.localStorage.removeItem("name");
            return false;
        }

        if (!response.ok) {
            console.error("🔹 Access Token 재발급 요청 실패! 상태 코드:", response.status);
            return false;
        }

        const newAccessToken = response.headers.get("access");

        if (!newAccessToken) {
            console.error("🔹 재발급된 access_token이 없음!");
            return false;
        }

        // 🔹 새로운 access_token 저장
        window.localStorage.setItem("access", newAccessToken);
        console.log("🔹 새로운 access_token 저장 완료:", newAccessToken);

        return true; // ✅ 성공 시 true 반환
    } catch (error) {
        console.error("🔹 fetchReissue() 요청 중 오류 발생:", error);
        return false;
    }
};

export default fetchReissue;
