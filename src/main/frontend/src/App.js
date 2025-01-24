import "./index.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AsideLayout from "./components/layout/AsideLayout";
import TestPage from "./pages/TestPage";
import PagingTestPage from "./pages/PagingTestPage";
import BoardWrite from "./pages/board/BoardWrite";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AlarmTestPage from "./pages/AlarmTestPage";

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

                <Route path="/test-alarm" element={
                    <AsideLayout>
                        <AlarmTestPage/>
                    </AsideLayout>
                } />

                <Route path="/boardWrite" element={
                    <Layout>
                        <BoardWrite/>
                    </Layout>
                } />


                <Route path="/sign-up" element={
                        <SignUpPage/>
                } />

                <Route path="/login" element={
                    <LoginPage />
                } />
            </Routes>
        </main>
    );
}

export default App;
