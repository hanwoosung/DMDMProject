import React, {useEffect, useState} from "react";
import styles from "../../assets/css/admin/CommonCode.module.css";
import useFetch from "../../hooks/common/useFetch";
import Select from "../common/SelectComponents";
import Input from "../common/InputComponents";
import SmallBtn from "../common/SmallBtnComponents";
import useApi from "../../hooks/common/useApi";

const CommonCodeManagement = () => {
    const [topCode, setTopCode] = useState("");
    const [code, setCode] = useState("");
    const [codeName, setCodeName] = useState("");
    const [field1, setField1] = useState("");
    const [field2, setField2] = useState("");
    const [field3, setField3] = useState("");
    const [field1Desc, setField1Desc] = useState("");
    const [field2Desc, setField2Desc] = useState("");
    const [field3Desc, setField3Desc] = useState("");
    const [codes, setCodes] = useState([]);
    const [selectedCodes, setSelectedCodes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const {post} = useApi();

    const {data: topGubns, loading: topGubnsLoading} = useFetch(`/api/v1/gubn`, {
        data: {
            parentCode: ""
        }
    }, "post");

    const topCodeOptions = topGubns?.data
        ? topGubns.data.map(item => ({value: item.code, label: item.name}))
        : [];

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


    const handleSave = () => {
        const newCode = {
            codeName: code,
            description: codeName,
            field1,
            field2,
            field3,
            field1Desc,
            field2Desc,
            field3Desc
        };
        setCodes([...codes, newCode]);
    };

    useEffect(() => {
        const fetchChildCodes = async () => {
            // if (!topCode) return;
            console.log(topCode)
            const response = await post("/api/v1/gubn", {
                body: {parentCode: topCode},
            });
            setCodes(response?.data || []);
            console.log(response?.data);
        };
        fetchChildCodes();
    }, [topCode]);

    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <label>상위</label>
                <Select options={[{value: "", label: ""}, ...topCodeOptions]} onChange={(value) => setTopCode(value)}
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
                    <Input value={field1Desc} onChange={(e) => setField1Desc(e.target.value)}/>
                </div>
                <div className={styles.formGroup}>
                    <label>특수필드1</label>
                    <Input value={field1} onChange={(e) => setField1(e.target.value)}/>
                </div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label>특수필드2 설명</label>
                    <Input value={field2Desc} onChange={(e) => setField2Desc(e.target.value)}/>
                </div>
                <div className={styles.formGroup}>
                    <label>특수필드2</label>
                    <Input value={field2} onChange={(e) => setField2(e.target.value)}/>
                </div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label>특수필드3 설명</label>
                    <Input value={field3Desc} onChange={(e) => setField3Desc(e.target.value)}/>
                </div>
                <div className={styles.formGroup}>
                    <label>특수필드3</label>
                    <Input value={field3} onChange={(e) => setField3(e.target.value)}/>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div>
                    <SmallBtn title="활성화" style={{marginRight: "10px"}}/>
                    <SmallBtn title={"비활성화"}/>
                </div>
                <SmallBtn title={"저장"} onClick={handleSave}/>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll}/>
                    </th>
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
                    <tr key={index}>
                        <td>
                            <input type="checkbox" checked={selectedCodes.includes(item.code)}
                                   onChange={() => handleCheckboxChange(item.code)}/>
                        </td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.field1Desc}</td>
                        <td>{item.field1}</td>
                        <td>{item.field2Desc}</td>
                        <td>{item.field2}</td>
                        <td>{item.field3Desc}</td>
                        <td>{item.field3}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommonCodeManagement;
