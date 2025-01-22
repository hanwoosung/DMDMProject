import "./index.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AsideLayout from "./components/layout/AsideLayout";
import TestPage from "./pages/TestPage";
import PagingTestPage from "./pages/PagingTestPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <div>메인페이지 입니다......</div>
                    </Layout>
                } />

                <Route path="/paging-test" element={
                    <Layout>
                        <PagingTestPage />
                    </Layout>
                }/>


                <Route path="/mypage" element={
                    <AsideLayout>
                        <div>마이페이지 입니다.......</div>
                    </AsideLayout>
                } />

                <Route path="/test" element={
                    <AsideLayout>
                        <TestPage/>
                    </AsideLayout>
                } />


                <Route path="/sign-up" element={
                        <SignUpPage/>
                } />
            </Routes>
        </main>
    );
}

export default App;
