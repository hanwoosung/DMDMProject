import Header from "./Header";
import styles from "../../assets/css/Layout.module.css";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main className={styles.content}>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;