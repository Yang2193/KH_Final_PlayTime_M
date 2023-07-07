import React, { useContext } from "react";
import JoinTitle from "./JoinTitle";
import { AccountInfoContext } from "../../context/AccountInfo";
import MemberInfo from "./MemberInfo";


const Join2 = () => {
    const { accountInfo, setAccountInfo } = useContext(AccountInfoContext)
    return (
        <>
        <JoinTitle>회원가입</JoinTitle>
        <MemberInfo accountInfo={accountInfo} setAccountInfo={setAccountInfo} />
        </>
    )
}

export default Join2;