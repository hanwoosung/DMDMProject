import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../assets/css/Banner.module.css';

const banners = [
    "https://greenart.co.kr/upimage/mainBanner/20250121102332.jpg",
    "https://greenart.co.kr/upimage/mainBanner/20250124134325.jpg",
    "https://greenart.co.kr/upimage/mainBanner/20250206163249.jpg"
];

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <div className={styles.bannerContainer}>
            <Slider {...settings}>
                {banners.map((src, index) => (
                    <div key={index} className={styles.bannerItem}>
                        <img src={src} alt={`배너 ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
