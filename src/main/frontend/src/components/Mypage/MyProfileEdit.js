import React, {useState} from "react";
import AccountApi from "../../api/AccountApi";
import MessageModal from "../../utils/MessageModal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";

const MenuBlock = styled.div`
  width: 100%;
  max-width: 768px;
  height: auto;
  margin: 100px auto 0;
  padding: 0 20px;
  text-align: center;

  .auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    border-bottom: 0.3px solid #D8D8D8;

    span {
      font-weight: bold;
      width: 100%;
      border-bottom: 0.3px solid #D8D8D8;
      text-align: center;
      color: #848484;
      padding-bottom: 20px;
    }

    table {
      margin: 0 auto;
      width: 100%;
      max-width: 320px; /* You can adjust this value as needed */
    }

    button {
      margin-top: 20px;
      padding: 12px 20px;
      text-decoration: none;
      width: 100%;
      max-width: 200px; /* You can adjust this value as needed */
      box-sizing: border-box;
      height: 50px;
      line-height: 25px;
      color: white;
      border: none;
      background-color: #990A2C;
      font-weight: 500;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #790A20;
      }
    }

    input {
      width: 100%;
      height: 40px;
      padding: 10px;
      box-sizing: border-box;
      margin-top: 20px;
      text-align: center;
    }
  }

  @media (max-width: 712px) {
    margin-top: 50px;
    .auth {
      padding: 12px 0;

      span {
        font-size: 20px;
        padding-bottom: 10px;
      }

      table {
        max-width: 280px;
      }

      button {
        max-width: 180px;
      }
    }
  }
`;


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

  // 인증번호 받기 버튼을 누를 때의 상태 저장
  const [isAuthRequested, setIsAuthRequested] = useState(false);

  const userAuthSendMail = async() => {
        try {
          const authKey = await AccountApi.sendAuthEmail(userInfo.userEmail);
          localStorage.setItem("authCode", authKey.data);
          setIsAuthRequested(true);
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

  const handleOnKeyPress = e => {
    if(e.key === 'Enter') {
      if(localStorage.getItem("loginValue") === "KAKAO"){
        onClickIsAuth();
      } else {
        onClickPwCheck();
      }
    }
}

  return (
    <>
    <Header/>
    <MenuBlock>
    {localStorage.getItem("loginValue") === "KAKAO" ? (
      <div className="auth">
        <span>프로필 수정</span>
        <table>
        {isAuthRequested ? (
              <>
                <button onClick={userAuthSendMail}>인증번호 받기</button>
                <input type="password" value={inputAuth} onChange={onChangeAuth} onKeyUp={handleOnKeyPress}/>
                <button onClick={onClickIsAuth}>인증</button>
              </>
            ) : (
              <button onClick={userAuthSendMail}>인증번호 받기</button>
            )}
        </table>
      </div>
    ) : (
      <div className="auth">
        <span>프로필 수정</span>
        <table>
        <input type="password" value={inputAuth} onChange={onChangeAuth} onKeyUp={handleOnKeyPress}/>
        <button onClick={onClickPwCheck}>인증</button>
        </table>
      </div>
    )}
    </MenuBlock>
    {authSuccessModal && (<MessageModal open={authSuccessModal} close={onClickClose} type="modalType" header="인증 완료">이메일 인증이 완료되었습니다.</MessageModal>)}
    {authFailModal && (<MessageModal open={authFailModal} close={onClickClose} type="modalType" header="인증 실패">이메일 인증이 실패하였습니다.</MessageModal>)}
    </>
  );
};

export default MyProfileEdit;
