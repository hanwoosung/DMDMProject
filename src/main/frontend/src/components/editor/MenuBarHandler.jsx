import useApi from "../../hooks/common/useApi";

const useMenuBarHandler = () => {

    const {get, post, put, del, loading, error} = useApi();

    const handleSaveFile = async (formData) => {
        return await post("/api/v1/board/file", {
            body: formData,
            header: "multipart/form-data"
        });
    };

    return { handleSaveFile }; // 이 부분은 그대로 두면 됩니다.
}

export default useMenuBarHandler;
