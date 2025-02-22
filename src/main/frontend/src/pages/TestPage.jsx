import {useState} from "react";
import BigBtn from "../components/common/BigBtnComponents";
import SmallBtn from "../components/common/SmallBtnComponents";
import Input from "../components/common/InputComponents";
import Select from "../components/common/SelectComponents";
import Search from "../components/common/SearchComponents";
import Filter from "../components/common/FilterComponents";
import Confirm from "../components/common/ConfirmComponents";
import Alert from "../components/common/AlertComponents";
import fetchAuthorizedPage from "../services/common/fetchAuthorizedPage";
import SendPointModal from "../components/point/SendPointModal";
import {useLocation, useNavigate} from "react-router-dom";
import MessageDetailModal from "../components/common/MessageDetailModal";

const TestPage = () => {

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [data, setData] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleConfirm = () => {
        alert("확인되었습니다.");
        setIsConfirmVisible(false); // 모달 숨기기
    };

    const handleCancel = () => {
        alert("취소되었습니다.");
        setIsConfirmVisible(false); // 모달 숨기기
    };

    const showConfirm = () => {
        setIsConfirmVisible(true); // 모달 표시
    };

    const [isAlert, setIsAlert] = useState(false);
    const showAlert = () => {
        setIsAlert(true); // 모달 표시
    };

    const alert2 = () => {
        alert("gdgd");
    }
    const onNaverLogin = () => {

        window.location.href = "http://localhost:8090/oauth2/authorization/naver"
    }

    const [isMessageOpen, setIsMessageOpen] = useState(false);

    const handleOpenMessageModal = () => {
        setIsMessageOpen(true);
    };
    /*    useEffect(() => {
            const fetchData = async () => {
                const result = await fetchAuthorizedPage("http://localhost:8090/api/test/admin", navigate, location);
                if (result) setData(result);
            };

            fetchData();
        }, [navigate, location]);*/

    const [isSendPoint, setIsSendPoint] = useState(false);
    const showSendPoint = () => {
        setIsSendPoint(true); // 모달 표시
    };

    return (

        <>
            <BigBtn onClick={alert2} />

            <SmallBtn onClick={alert2} />

            <Input onClick={alert2} />

            <Select onChange={alert2} />

            <Search onClick={alert2} />


            <Filter list={[{label: "전체", value: ""}, {label: "전체2", value: "2"}]}
                    defaultValue={"2"}
                    onClick={(value) => {
                        alert(value)
                    }}
            />

            <BigBtn title={"컨펌열기"}
                    onClick={showConfirm} />

            <Confirm
                isVisible={isConfirmVisible}
                message="이 항목을 정말 삭제하시겠습니까?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            <BigBtn title={"Alert열기"}
                    onClick={showAlert} />

            <Alert
                isVisible={isAlert}
                message="한우성 glgl~"
                onAlert={() => {
                    setIsAlert(false);
                }}
            />

            <BigBtn title={"포인트 보내기"}
                    onClick={showSendPoint}/>

            <SendPointModal isVisible={isSendPoint} recipient={"도지도지 도오지"} receiveUserId={"yiok79"} onClose={() => setIsSendPoint(false)}/>

            <a href="http://localhost:8090/oauth2/authorization/naver">로그인</a>

            <div onClick={handleOpenMessageModal}>쪽지 상세 테스트</div>
            {isMessageOpen && (
                <MessageDetailModal messageId={1} onClose={() => setIsMessageOpen(false)}></MessageDetailModal>
            )}


        </>
    );

}

export default TestPage;