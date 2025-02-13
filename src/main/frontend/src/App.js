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
import OAuth2Redirect from "./services/common/OAuth2Redirect";
import Logout from "./pages/Logout";
import {useLogin} from "./contexts/AuthContext";
import BoardList from "./pages/board/BoardList";
import FightZone from "./pages/FightZone";

import EmoticonRegister from "./components/emoticon/EmoticonRegister";
import CommonCodeManagement from "./pages/admin/CommonCodeManagement";
import PostManagement from "./pages/admin/PostManagement";

function App() {
    const {isLoggedIn} = useLogin();
    return (
        <main>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <div>메인페이지 입니다......</div>
                    </Layout>
                }/>

                <Route path="/paging-test" element={
                    <Layout>
                        <PagingTestPage/>
                    </Layout>
                }/>


                <Route path="/mypage" element={
                    <AsideLayout>
                        <div>마이페이지 입니다.......</div>
                    </AsideLayout>
                }/>

                <Route path="/adminpage" element={
                    <AsideLayout title={"공통코드 관리"}>
                        <CommonCodeManagement/>
                    </AsideLayout>
                }/>

                <Route path="/adminpage/board" element={
                    <AsideLayout title={"게시물 관리"}>
                        <PostManagement/>
                    </AsideLayout>
                }/>

                <Route path="/test" element={
                    <AsideLayout>
                        <TestPage/>
                    </AsideLayout>
                }/>

                <Route path="/test-alarm" element={
                    <AsideLayout>
                        <AlarmTestPage/>
                    </AsideLayout>
                } />

                <Route path="/board-write/:boardType" element={
                    <Layout>
                        <BoardWrite/>
                    </Layout>
                } />

                <Route path="/board-list/:boardType" element={
                    <Layout>
                        <BoardList/>
                    </Layout>
                } />

                <Route path="/sign-up" element={
                    <SignUpPage/>
                }/>

                <Route path="/login" element={
                    <LoginPage/>
                }/>
                <Route path="/oauth2-jwt-header" element={<OAuth2Redirect/>}/>

                <Route path="/logout" element={<Logout />} />

                <Route path="/fight-zone/:roomNo" element={
                    <FightZone/>
                }/>
                <Route path="/emoticon-register" element={
                    <Layout>
                        <EmoticonRegister/>
                    </Layout>
                }/>

            </Routes>
        </main>
    );
}

export default App;
