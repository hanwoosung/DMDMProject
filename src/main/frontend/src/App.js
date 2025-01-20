import "./index.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AsideLayout from "./components/layout/AsideLayout";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <div>메인페이지 입니다......</div>
                    </Layout>
                }/>

                <Route path="/mypage" element={
                    <AsideLayout>
                        <div>마이페이지 입니다.......</div>
                    </AsideLayout>
                }/>
            </Routes>
        </main>
    );
}

export default App;
