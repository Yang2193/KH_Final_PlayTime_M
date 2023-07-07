import React, {useContext} from "react";
import { AccountInfoContext } from "../../context/AccountInfo";
import AccountApi from "../../api/AccountApi";
import { useNavigate } from "react-router-dom";

const DeleteMember = () => {
    const context = useContext(AccountInfoContext);
    const {userId} = context;
    const navigate = useNavigate();

    const onClickDeleteInfo = async() => {
        try {
            const response = await AccountApi.deleteMember(userId);
            if(response.status === 200) {
                navigate("/")
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
        <button onClick={onClickDeleteInfo}>회원탈퇴</button>
        </>
    )
}

export default DeleteMember;