import React, {useState} from "react";
import AccountApi from "../../api/AccountApi";
import MessageModal from "../../utils/MessageModal";
import { useNavigate } from "react-router-dom";

const MyProfileEdit = () => {
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  const navigate = useNavigate();

  // 키보드 입력
  const [inputAuth, setInputAuth] = useState("");

  //팝업창
  const [isAllCheckModalOpen, setIsAllCheckModalOpen] = useState(false);
  const [authSuccessModal, setAuthSuccessModal] = useState(false);
  const [authFailModal, setAuthFailModal] = useState(false);

  // 유효성 검사
  const [isAuth, setIsAuth] = useState(false);

  //모달창 닫기
  const onClickClose = () => {
      setIsAllCheckModalOpen(false);
      setAuthSuccessModal(false);
      setAuthFailModal(false);
  }

  const userAuthSendMail = async() => {
        try {
          const authKey = await AccountApi.sendAuthEmail(userInfo.userEmail);
          localStorage.setItem("authCode", authKey.data);
        } catch (e) {
          console.log(e);
        }   
  }

  const onChangeAuth = (e) => {
    const authNow = e.target.value;
    setInputAuth(authNow);
  }
  
  const onClickIsAuth = async() => {
    if(localStorage.getItem("authCode") === inputAuth) {
        setAuthSuccessModal(true);
        setIsAuth(true);
        navigate("/mypage/profile_edit/info")
    } else {
        setAuthFailModal(true);
    }
  }

  const onClickPwCheck = async () => {
    try {
      const response = await AccountApi.checkMemberPw(userInfo.userId, inputAuth);
      if (response.data) {
        setAuthSuccessModal(true);
        setIsAuth(true);
        navigate("/mypage/profile_edit/info");
      } else {
        setAuthFailModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    {localStorage.getItem("loginValue") === "KAKAO" ? (
      <>
        <button onClick={userAuthSendMail}>인증번호 받기</button>
        <input type="password" value={inputAuth} onChange={onChangeAuth} />
        <button onClick={onClickIsAuth}>인증</button>
        {authSuccessModal && (<MessageModal open={authSuccessModal} close={onClickClose} type="modalType" header="인증 완료">이메일 인증이 완료되었습니다.</MessageModal>)}
        {authFailModal && (<MessageModal open={authFailModal} close={onClickClose} type="modalType" header="인증 실패">이메일 인증이 실패하였습니다.</MessageModal>)}
      </>
    ) : (
      <>
        <input type="password" value={inputAuth} onChange={onChangeAuth}/>
        <button onClick={onClickPwCheck}>인증</button>
      </>
    )}
    </>
  );
};

export default MyProfileEdit;
