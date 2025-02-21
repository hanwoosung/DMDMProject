import Header from "./Header";
import styles from "../../assets/css/AsideLayout.module.css";
import Footer from "./Footer";
import Aside from "./Aside";
import AdminAside from "./AdminAside";
import {useLogin} from "../../contexts/AuthContext";

const AsideLayout = ({ children, title }) => {
    const { role } = useLogin();

    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.content}>
                {role === "ROLE_ADMIN" ? <AdminAside /> : <Aside />}
                <div className={styles.detail}>
                    {title ? <h1>{title}</h1> : null}
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AsideLayout;
