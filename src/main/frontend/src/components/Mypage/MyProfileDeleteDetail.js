import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AccountApi from "../../api/AccountApi";
import { AccountInfoContext } from "../../context/AccountInfo";
import MessageModal from "../../utils/MessageModal";

export const MyProfileDeleteDetail = () => {
  const navigate = useNavigate();
  const {userId, setWithdraw} = useContext(AccountInfoContext);

  const [showModal, setShowModal] = useState(false);

  const handleWithdraw = () => {
    setShowModal(true);
  };

  const handleConfirmWithdraw = async() => {
    try {
        const response = await AccountApi.withdraw(userId);
        if(response.status === 200){
            console.log("회원탈퇴 성공");
            localStorage.setItem("isLogin", "FALSE");
        }
      } catch (e) {
        console.log(e);
      }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.clear();
    setWithdraw(false)
    navigate("/");
  };

  return (
    <div>
      {/* 회원 탈퇴 버튼 */}
      <button onClick={handleWithdraw}>회원 탈퇴</button>

      {/* 회원 탈퇴 모달 */}
      <MessageModal
        open={showModal}
        confirm={handleConfirmWithdraw}
        close={handleCloseModal}
        header="회원 탈퇴"
      >
        회원 탈퇴 되었습니다.
      </MessageModal>
    </div>
  );
};

export const WithdrawPwCheck = () => {
    const { userPw, setWithdraw } = useContext(AccountInfoContext);
    const [inputPw, setInputPw] = useState("");
    const [checkPwMsg, setCheckPwMsg] = useState("");
  
    const onChageCheckPw = (e) => {
      setInputPw(e.target.value);
    }
    
    const checkPw = () => {
      if(inputPw === userPw){
        setWithdraw(true);
        setCheckPwMsg("");
      } 
      else {
        setCheckPwMsg("메세지가 일치하지 않습니다.")
        setWithdraw(false);
      }
    }

    return (
        <>
        <input type="password" value={inputPw} onChange={onChageCheckPw} placeholder="패스워드"/>
        <button onClick={checkPw}>확인</button>
        <p>{checkPwMsg}</p>
        </>
    );
};