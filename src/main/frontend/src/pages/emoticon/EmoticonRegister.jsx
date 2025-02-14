import React, {useRef, useState} from "react";
import styles from "../../assets/css/emoticon/EmoticonRegister.module.css";
import Input from "../../components/common/InputComponents";
import TextArea from "../../components/common/TextAreaComponents";
import SmallBtn from "../../components/common/SmallBtnComponents";
import BigBtn from "../../components/common/BigBtnComponents";
import useApi from "../../hooks/common/useApi";

export default function EmoticonRegister() {
    const {post} = useApi();

    const [productName, setProductName] = useState("");
    const [productDetail, setProductDetail] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

        const filteredFiles = files.filter(file => {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                alert("이미지 파일(jpg, jpeg, png, gif, webp)만 업로드 가능합니다.");
                return false;
            }
            return true;
        });

        if (filteredFiles.length >= 5 && filteredFiles.length <= 20) {
            setImages(filteredFiles);
            setMainImage(filteredFiles[0]); // 대표 이미지 자동 설정
        } else if (filteredFiles.length > 0) {
            alert("5개 이상 20개 이하의 이미지를 업로드해야 합니다.");
        }
    };

    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);

        if (mainImage === images[index]) {
            if (newImages.length > 0) {
                setMainImage(newImages[0]);
            } else {
                setMainImage(null);
            }
        }
    };

    const handleSubmit = async () => {
        // console.log({ title: productName, description: productDetail, price: productPrice, images });

        if (!productName || !productDetail || productPrice === undefined || images.length < 5) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        const formData = new FormData();

        images.forEach((file) => {
            formData.append("files", file);
        });

        formData.append("productName", productName);
        formData.append("productDetail", productDetail);
        formData.append("productPrice", productPrice);

        // console.log("🔹 FormData 내용:");
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}:`, pair[1]);
        // }
        const response = await post("api/v1/product/EMOTICON", {
                headers: {"Content-Type": "multipart/form-data"},
                body: formData
            }
        ).then((res) => {
                console.log(res);
                // if (res) {
                //     alert("이모티콘이 성공적으로 등록되었습니다!");
                // } else {
                //     // const errorData = response.json();
                //     // console.log(`등록 실패: ${errorData.message}`);
                // }
            }
        ).catch((error) => {
            console.error("등록 중 오류 발생:", error);
            console.log("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        })
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>이미지 등록 폼</h1>

            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label className={styles.label} style={{textAlign: "center"}}>대표 이미지</label>
                    <div className={styles.mainImageBox}>
                        {mainImage ? (
                            <img
                                src={URL.createObjectURL(mainImage)}
                                alt="대표 이미지"
                                className={styles.mainImagePreview}
                                draggable={false}
                            />
                        ) : (
                            <div className={styles.placeholder}>대표 이미지 없음</div>
                        )}
                    </div>
                </div>

                <div className={styles.formInfoContainer}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>제목</label>
                        <Input
                            width="100%"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>설명</label>
                        <TextArea
                            value={productDetail}
                            height="80px"
                            onChange={(e) => setProductDetail(e.target.value)}
                            placeholder="설명을 입력하세요"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>가격 (0 ~ 3000)</label>
                        <Input
                            type="number"
                            min="0"
                            max="3000"
                            value={productPrice}
                            width="100%"
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value, 10); // 숫자로 변환
                                if (!isNaN(newValue) && newValue >= 0 && newValue <= 3000) {
                                    setProductPrice(newValue);
                                }
                            }}
                            placeholder="가격을 입력하세요"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.imageFormGroup}>


                <div className={styles.imageRegisterForm}>
                    <label className={styles.imageLabel} style={{marginRight: "10px"}}>100x100, 5~20개</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                        multiple
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        style={{display: "none"}}
                    />
                    <SmallBtn
                        title={"일괄 업로드"}
                        onClick={() => fileInputRef.current.click()}
                    />
                </div>
                <div className={styles.imagePreviewContainer}>
                    {images.map((image, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`upload-${index}`}
                                className={styles.imagePreview}
                                draggable={false}
                            />
                            <button
                                className={styles.removeButton}
                                onClick={() => handleImageRemove(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <BigBtn title={"이모티콘 등록"} onClick={handleSubmit}/>
        </div>
    );
}
