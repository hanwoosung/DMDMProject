import React, {useEffect, useState} from "react";
import styles from "../../assets/css/admin/CommonCode.module.css";
import useFetch from "../../hooks/common/useFetch";
import Select from "../../components/common/SelectComponents";
import Input from "../../components/common/InputComponents";
import SmallBtn from "../../components/common/SmallBtnComponents";
import useApi from "../../hooks/common/useApi";
import Alert from "../../components/common/AlertComponents";

const CommonCodeManagement = () => {
        const [topCode, setTopCode] = useState("");
        const [code, setCode] = useState("");
        const [codeName, setCodeName] = useState("");
        const [firstSpecial, setFirstSpecial] = useState("");
        const [secondSpecial, setSecondSpecial] = useState("");
        const [thirdSpecial, setThirdSpecial] = useState("");
        const [firstSpecialDescription, setFirstSpecialDescription] = useState("");
        const [secondSpecialDescription, setSecondSpecialDescription] = useState("");
        const [thirdSpecialDescription, setThirdSpecialDescription] = useState("");
        const [codes, setCodes] = useState([]);
        const [selectedCodes, setSelectedCodes] = useState([]);
        const [selectAll, setSelectAll] = useState(false);
        const [topCodeOptions, setTopCodeOptions] = useState([]);
        const {post} = useApi();
        const [isAlert, setIsAlert] = useState(false);
        const [alertMessage, setAlertMessage] = useState("");

        const onAlert = (message) => {
            setIsAlert(true);
            setAlertMessage(message);
        }

        const handleCheckboxChange = (code) => {
            setSelectedCodes(prevSelected =>
                prevSelected.includes(code)
                    ? prevSelected.filter(item => item !== code)
                    : [...prevSelected, code]
            );
        };

        const handleSelectAll = () => {
            if (selectAll) {
                setSelectedCodes([]);
            } else {
                setSelectedCodes(codes.map(item => item.code));
            }
            setSelectAll(!selectAll);
        };

        const handleRowClick = (item) => {
            setCode(item.code || "");
            setCodeName(item.name || "");
            setFirstSpecial(item.firstSpecial || "");
            setSecondSpecial(item.secondSpecial || "");
            setThirdSpecial(item.thirdSpecial || "");
            setFirstSpecialDescription(item.firstSpecialDescription || "");
            setSecondSpecialDescription(item.secondSpecialDescription || "");
            setThirdSpecialDescription(item.thirdSpecialDescription || "");
        };

        const fetchTopCodes = async () => {
            const response = await post(`/api/v1/gubn`, {
                body: {parentCode: ""},
            });
            return response?.data || [];
        };

        useEffect(() => {
            const fetchAndSetTopCodes = async () => {
                const updatedTopGubns = await fetchTopCodes();
                setTopCodeOptions(updatedTopGubns.map((gubn) => ({value: gubn.code, label: gubn.name})));
            };
            fetchAndSetTopCodes();
        }, []);

        const handleSave = async () => {
            if(code === '') {
                onAlert("코드를 입력해주세요.");
                return;
            }
            const newCode = {
                parentCode: topCode,
                code,
                name: codeName,
                firstSpecial: firstSpecial,
                secondSpecial: secondSpecial,
                thirdSpecial: thirdSpecial,
                firstSpecialDescription: firstSpecialDescription,
                secondSpecialDescription: secondSpecialDescription,
                thirdSpecialDescription: thirdSpecialDescription,
                status: "ACTIVE",
            };

            const response = await post("/api/v1/gubn/save", {
                body: newCode
            });

            if (response.result === "SUCCESS") {
                const updatedTopGubns = await fetchTopCodes();
                setTopCodeOptions(updatedTopGubns.map((gubn) => ({value: gubn.code, label: gubn.name})));

                const response = await post(isParent() ? "/api/v1/gubn" : "/api/v1/gubn/child", {
                    body: {parentCode: topCode},
                });
                setCodes(response?.data || []);
                onAlert("저장 완료");
            } else {
                onAlert("저장 실패");
            }
        };

        const handleUpdateStatus = async (status) => {
            const isActive = status === "ACTIVE";

            if (selectedCodes.length === 0) {
                return onAlert(isActive ? "활성화할 항목을 선택하세요." : "비활성화할 항목을 선택하세요.");
            }

            const selectedItems = codes.filter(item => selectedCodes.includes(item.code));
            const updatePayload = selectedItems.map(item => ({
                code: item.code,
                parentCode: item.parentCode
            }));

            const updatedCodes = codes.map(item =>
                selectedCodes.includes(item.code) ? {...item, status} : item
            );

            const response = await post(`/api/v1/gubn/update-status?status=${status}`, {
                body: updatePayload
            });

            if (response.result === "SUCCESS") {
                setCodes(updatedCodes);
            } else {
                onAlert(isActive ? "활성화 실패" : "비활성화 실패");
            }
        };


        useEffect(() => {
            const fetchChildCodes = async () => {
                try {
                    const response = await post(isParent() ? "/api/v1/gubn" : "/api/v1/gubn/child", {
                        body: {parentCode: topCode},
                    });
                    if (!isParent()) {
                        const response = await post(`/api/v1/gubn/-/${topCode}`);
                        const codeData = response?.data || [];
                        setFirstSpecialDescription(codeData.firstSpecialDescription);
                        setSecondSpecialDescription(codeData.secondSpecialDescription);
                        setThirdSpecialDescription(codeData.thirdSpecialDescription);
                    }
                    setCodes(response?.data);
                } catch (error) {
                    console.error("데이터 가져오기 실패:", error);
                }
            };
            fetchChildCodes();
        }, [topCode]);

        function isParent() {
            return topCode === '';
        }

        return (
            <>
                <Alert isVisible={isAlert} message={alertMessage} onAlert={() => setIsAlert(false)}/>
                <div className={styles.container}>
                    <div className={styles.formGroup}>
                        <label>상위</label>
                        <Select options={[{value: "", label: ""}, ...topCodeOptions]} onChange={(value) => {
                            setTopCode(value);
                            handleRowClick({})
                        }}
                                value={topCode}/>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label>코드</label>
                            <Input value={code} onChange={(e) => setCode(e.target.value)}/>
                        </div>
                        <div className={styles.formGroup}>
                            <label>명</label>
                            <Input value={codeName} onChange={(e) => setCodeName(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label>특수필드1 설명</label>
                            <Input disabled={!isParent()} value={firstSpecialDescription}
                                   onChange={(e) => setFirstSpecialDescription(e.target.value)}/>
                        </div>
                        <div className={styles.formGroup}>
                            <label>특수필드1</label>
                            <Input disabled={isParent()} value={firstSpecial}
                                   onChange={(e) => setFirstSpecial(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label>특수필드2 설명</label>
                            <Input disabled={!isParent()} value={secondSpecialDescription}
                                   onChange={(e) => setSecondSpecialDescription(e.target.value)}/>
                        </div>
                        <div className={styles.formGroup}>
                            <label>특수필드2</label>
                            <Input disabled={isParent()} value={secondSpecial}
                                   onChange={(e) => setSecondSpecial(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label>특수필드3 설명</label>
                            <Input disabled={!isParent()} value={thirdSpecialDescription}
                                   onChange={(e) => setThirdSpecialDescription(e.target.value)}/>
                        </div>
                        <div className={styles.formGroup}>
                            <label>특수필드3</label>
                            <Input disabled={isParent()} value={thirdSpecial}
                                   onChange={(e) => setThirdSpecial(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div>
                            <SmallBtn title="활성화" onClick={() => handleUpdateStatus("ACTIVE")}
                                      style={{marginRight: "10px"}}/>
                            <SmallBtn title="비활성화" onClick={() => handleUpdateStatus("DEACTIVE")}/>
                        </div>
                        <SmallBtn title={"저장"} onClick={handleSave}/>
                    </div>
                    <div className="table-container">
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll}/></th>
                                <th>코드</th>
                                <th>명</th>
                                <th>특수필드1 설명</th>
                                <th>특수필드1</th>
                                <th>특수필드2 설명</th>
                                <th>특수필드2</th>
                                <th>특수필드3 설명</th>
                                <th>특수필드3</th>
                                <th>상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {codes?.map((item, index) => (
                                <tr key={index}
                                    className={`${styles.tableRow} ${item.status === 'DEACTIVE' && styles.deActive}`}
                                    onClick={() => handleRowClick(item)}>
                                    <td>
                                        <input type="checkbox" checked={selectedCodes.includes(item.code)}
                                               onClick={(e) => e.stopPropagation()}
                                               onChange={() => handleCheckboxChange(item.code)}/>
                                    </td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.firstSpecialDescription}</td>
                                    <td>{item.firstSpecial}</td>
                                    <td>{item.secondSpecialDescription}</td>
                                    <td>{item.secondSpecial}</td>
                                    <td>{item.thirdSpecialDescription}</td>
                                    <td>{item.thirdSpecial}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
;

export default CommonCodeManagement;
