import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../../assets/css/emoticon/EmoticonList.module.css";
import useApi from "../../hooks/common/useApi";

const EmoticonList = () => {
    const {get} = useApi();
    const [emoticons, setEmoticons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmoticons = async () => {
            try {
                const response = await get("/api/v1/product/EMOTICON");
                setEmoticons(response.data);
            } catch (err) {
                setError("이모티콘 목록을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmoticons();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>이모티콘 샵</h1>
            <div className={styles.emoticonGrid}>
                {emoticons.map((emoticon) => (
                    <Link key={emoticon.productId} to={`/emoticon/${emoticon.productId}`} className={styles.emoticonCard}>
                        <img src={emoticon.mainImage} alt={emoticon.productName} className={styles.emoticonImage} />
                        <p className={styles.emoticonName}>{emoticon.productName}</p>
                        <span className={styles.emoticonPrice}>{emoticon.productPrice.toLocaleString()}원</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EmoticonList;
