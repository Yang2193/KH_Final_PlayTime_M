import React from "react";
import Join1 from "../components/Account/Join1";
import Join2 from "../components/Account/Join2";
import Join3 from "../components/Account/Join3";
import { Routes, Route } from "react-router-dom";
import AccountProvide from "../context/AccountInfo";
import Header from "../components/Header";
import Footer from "../components/Footer";

const JoinPage = () => {
    return (
        <>
        <Header/>
        <AccountProvide>
            <Routes>
                <Route path="/" element={<Join1/>} />
                <Route path="/step2" element={<Join2/>} />
                <Route path="/step3" element={<Join3/>} />
            </Routes>
        </AccountProvide>
        <Footer/>
        </>
    );
}
export default JoinPage;