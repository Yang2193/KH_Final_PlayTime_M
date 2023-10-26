import React, { useCallback, useEffect, useState } from "react";
import MyPageMain from "../components/Mypage/MyPageMain";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Mypage = () => {

    return (
        <>
        {/*  깃 커밋 */}
        <Header/>
        <MyPageMain/>
        <Footer/>
        </>
    );
}

export default Mypage;