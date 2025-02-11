import React, {useState} from "react";
import styles from "../../assets/css/emoticon/EmoticonRegister.module.css";
import Input from "../common/InputComponents";
import InputComponents from "../common/InputComponents";
import TextAreaComponents from "../common/TextAreaComponents";
import TextArea from "../common/TextAreaComponents";

export default function EmoticonRegister() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length >= 5 && files.length <= 20) {
            setImages(files);
            setMainImage(files[0]); // 대표 이미지 자동 설정
        } else {
            alert("5개 이상 20개 이하의 이미지를 업로드해야 합니다.");
        }
    };

    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        if (mainImage === images[index]) {
            setMainImage(null);
        }
    };

    const handleMainImageSelect = (image) => {
        setMainImage(image);
    };

    const handleSubmit = () => {
        console.log({title, description, price, images, mainImage});
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>이미지 등록 폼</h1>

            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label style={{textAlign:"center"}} className={styles.label}>대표 이미지</label>
                    <div className={styles.mainImageBox}>
                        {mainImage ? (
                            <img
                                src={URL.createObjectURL(mainImage)}
                                alt="대표 이미지"
                                className={styles.mainImagePreview}
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>설명</label>
                        <TextArea
                            value={description}
                            height="80px"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="설명을 입력하세요"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>가격 (0 ~ 3000)</label>
                        <Input
                                         type="number"
                                         min="0"
                                         max="3000"
                                         value={price}
                                         width="100%"
                                         onChange={(e) => setPrice(e.target.value)}  placeholder={"가격을 입력하세요"}/>
                    </div>
                </div>
            </div>


            <div className={styles.imageFormGroup}>
                <label className={styles.imageLabel}>100x100, 5~20개</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className={styles.uploadButton}
                />
                <div className={styles.imagePreviewContainer}>
                    {images.map((image, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`upload-${index}`}
                                className={styles.imagePreview}
                                onClick={() => handleMainImageSelect(image)}
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

            <button onClick={handleSubmit} className={styles.submitButton}>
                이모티콘 등록
            </button>
        </div>
    );
}
