import Header from "./Header";
import styles from "../../assets/css/AsideLayout.module.css";
import Footer from "./Footer";
import Aside from "./Aside";
import AdminAside from "./AdminAside";

const AsideLayout = ({children, title}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main className={styles.content}>
                {/*잠시 주석했다잉*/}
                <Aside/>
                {/*<AdminAside/>*/}
                <div className={styles.detail}>
                    {title ? <h1>{title}</h1> : null}
                    {children}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default AsideLayout;