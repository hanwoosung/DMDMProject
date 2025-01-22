import "./index.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AsideLayout from "./components/layout/AsideLayout";
import Input from "./components/common/InputComponents";
import Select from "./components/common/SelectComponents";
import Search from "./components/common/SearchComponents";
import SmallBtn from "./components/common/SmallBtnComponents";
import BigBtn from "./components/common/BigBtnComponents";
import Filter from "./components/common/FilterComponents";
import Confirm from "./components/common/ConfirmComponents";
import {useState} from "react";
import TestPage from "./pages/TestPage";
import PagingTestPage from "./pages/PagingTestPage";
import FightZone from "./pages/FightZone";

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

                <Route path="/fight-zone/:roomNo" element={
                    <FightZone/>
                }/>
            </Routes>
        </main>
    );
}

export default App;
