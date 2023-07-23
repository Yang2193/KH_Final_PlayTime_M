import React, { useContext } from "react";
import JoinTitle from "./JoinTitle";
import { AccountInfoContext } from "../../context/AccountInfo";
import MemberInfo from "./MemberInfo";


const Join2 = () => {
    return (
        <>
        <JoinTitle>회원가입</JoinTitle>
        <MemberInfo />
        </>
    )
}

export default Join2;