import "./index.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AsideLayout from "./components/layout/AsideLayout";
import TestPage from "./pages/TestPage";
import PagingTestPage from "./pages/PagingTestPage";
import BoardWrite from "./pages/board/BoardWrite";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import OAuth2Redirect from "./services/common/OAuth2Redirect";
import Logout from "./pages/Logout";
import {useLogin} from "./contexts/AuthContext";
function App() {
    const { isLoggedIn } = useLogin();
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
                <Route path="/oauth2-jwt-header" element={<OAuth2Redirect />} />

                {isLoggedIn && <Route path="/logout" element={<Logout />} />}

            </Routes>
        </main>
    );
}

export default App;
