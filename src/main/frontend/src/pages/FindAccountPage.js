import React from "react";
import { FindUserId, FindUserPw } from "../components/Account/FindAccount";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FindAccountPage = () => {
    return (
        <>
        <Header/>
        <FindUserId/>
        <FindUserPw/>
        <Footer/>
        </>
    )
}

export default FindAccountPage;