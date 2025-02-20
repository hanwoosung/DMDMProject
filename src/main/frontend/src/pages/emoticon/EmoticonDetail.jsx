import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import useApi from "../../hooks/common/useApi";
import styles from "../../assets/css/emoticon/EmoticonDetail.module.css";
import BigBtn from "../../components/common/BigBtnComponents";

const EmoticonDetail = () => {
    const {get, post} = useApi();
    const {productId} = useParams();
    const [emoticon, setEmoticon] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmoticon = async () => {
            try {
                const response = await get(`/api/v1/product/EMOTICON/detail?productId=${productId}`);
                setEmoticon(response.data);
                console.log(response.data);
            } catch (err) {
                setError("이모티콘 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmoticon();
    }, [productId]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const buyEmoticon = () => {
        post("/api/v1/product/EMOTICON")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (loading) return <p className={styles.loading}>로딩 중...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!emoticon) return <p className={styles.notFound}>이모티콘 정보를 찾을 수 없습니다.</p>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <img src={emoticon.mainImage}/>
                </div>
                <div className={styles.infoContainer}>
                    <h2 className={styles.title}>{emoticon.productName || "이모티콘 이름 없음"}</h2>
                    <p className={styles.description}>{emoticon.productDetail || "설명 없음"}</p>
                    <div className={styles.infoFooter}>
                    <span
                        className={styles.price}>{emoticon.productPrice ? `${emoticon.productPrice.toLocaleString()}원` : "가격 없음"}
                    </span>
                        <div className={styles.actions}>
                            <BigBtn width={"50%"} title="구매하기" onClick={() => buyEmoticon()}/>
                            {/*<BigBtn title="신고하기" onClick={() => alert("신고 기능 미구현")}/>*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.imageGallery}>
            {emoticon.emoticonImages && emoticon.emoticonImages.length > 0 ? (
                    emoticon.emoticonImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`이모티콘 ${index}`}
                            className={styles.thumbnail}
                            onClick={() => handleImageClick(image)}
                        />
                    ))
                ) : (
                    <p className={styles.noImage}>이모티콘 이미지 없음</p>
                )}
            </div>




            {selectedImage && (
                <div className={styles.modal} onClick={handleCloseModal}>
                    <img src={selectedImage} alt="확대된 이모티콘" className={styles.modalImage}/>
                </div>
            )}
        </div>
    );
};

export default EmoticonDetail;
