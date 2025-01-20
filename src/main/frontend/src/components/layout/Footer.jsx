import styles from "../../assets/css/Footer.module.css";

const Footer = () => {
    return (
        <footer>
            <div className={styles.footerContent}>© 2025 YourCommunityName. All rights reserved.</div>
            <div className={styles.textBtnRow}>
                <div className={styles.footerContent} style={{cursor: "pointer"}}>이용약관</div>
                <div className={styles.footerContent}>|</div>
                <div className={styles.footerContent} style={{cursor: "pointer"}}>개인정보처리방침</div>
                <div className={styles.footerContent}>|</div>
                <div className={styles.footerContent} style={{cursor: "pointer"}}>고객센터</div>
            </div>
        </footer>
    );
}
export default Footer;