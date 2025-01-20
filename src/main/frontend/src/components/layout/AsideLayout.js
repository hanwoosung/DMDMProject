import Header from "./Header";
import styles from "../../assets/css/AsideLayout.module.css";
import Footer from "./Footer";
import Aside from "./Aside";

const AsideLayout = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main className={styles.content}>
                <Aside/>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default AsideLayout;