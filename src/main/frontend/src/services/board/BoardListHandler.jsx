import {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/common/useFetch";
import {useParams, useNavigate} from "react-router-dom";

const useBoardListHandler = () => {

    const {boardType: boardTypeParam} = useParams();
    const [boardType, setBoardType] = useState({});

    const [alertMessage, setAlertMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pagingData, setPagingData] = useState({});
    const pageSize = 10;

    const [searchType, setSearchType] = useState("all");
    const [searchData, setSearchData] = useState("");
    const [search, setSearch] = useState("");

    const [sortType, setSortType,] = useState("recent");

    const [boardList, setBoardList] = useState([]);

    const {data: fetchedEvents, loading} = useFetch(`/api/v1/gubn/BOARD_CATEGORY/${boardTypeParam}`, {
        data: {
            parentCode: "BOARD_CATEGORY"
        }
    }, "post");

    const {
        data: boardListData,
        boardListDataLoading
    } = useFetch(`/api/v1/board/list/${boardTypeParam}?page=${currentPage}&size=${pageSize}&searchType=${searchType}&searchData=${searchData}&sortType=${sortType}`, {}, "get");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {

        // fetchedEvents 로드 후 기본 화면 설정
        if (fetchedEvents) {
            if (fetchedEvents.statusCode === 200) {
                setBoardType(fetchedEvents.data);
            } else {
                setIsAlert(true);
                setAlertMessage(fetchedEvents.message);
            }
        }

        if (boardListData) {
            if (boardListData.statusCode === 200) {
                setBoardList(boardListData.data.list);
                setPagingData(boardListData.data.paging);
            } else {
                setBoardList([]);
            }
        }


    }, [fetchedEvents, boardListData, currentPage, pageSize]);

    return {
        sortType,
        setSortType,
        search,
        setSearch,
        searchType,
        setSearchType,
        searchData,
        setSearchData,
        currentPage,
        pagingData,
        pageSize,
        boardList,
        boardType,
        alertMessage,
        setAlertMessage,
        isAlert,
        setIsAlert,
        isConfirmVisible,
        setIsConfirmVisible,
        confirmMessage,
        setConfirmMessage,
        handlePageChange
    }
}

export default useBoardListHandler;