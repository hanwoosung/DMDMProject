import axios from "axios";

const fetchUserProfile = async (userId) => {
    try {
        console.log("🔹 프로필 이미지 요청:", userId);

        const response = await axios.post("http://localhost:8090/file/path", {
            fileRef: userId,
            fileType: "PROFILE",
        }, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("🔹 프로필 이미지 응답:", response.data);

        return response.data.data;
    } catch (error) {
        console.error("🔹 프로필 이미지 가져오기 실패:", error);
        return null;
    }
};

export default fetchUserProfile;
