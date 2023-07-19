import React, {useContext} from "react";
import { AccountInfoContext } from "../../context/AccountInfo";
import { useNavigate } from "react-router-dom";
import { MyProfileDeleteDetail, WithdrawPwCheck} from "./MyProfileDeleteDetail";

const MyprofileDelete = () => {
    const context = useContext(AccountInfoContext);
    const {withdraw} = context;

    // 회원 삭제
    
    return (
        <>
        {withdraw ? <MyProfileDeleteDetail/> : <WithdrawPwCheck/>}
        </>
    );
}

export default MyprofileDelete;