import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountApi from "../../api/AccountApi";
import '../../styles/Account.css';
import { AccountInfoContext } from "../../context/AccountInfo";

  const Login = () => {
    const navigate = useNavigate();
    const [tokenDto, setTokenDto] = useState("");
    const context = useContext(AccountInfoContext);
    const {setUserId, setUserPw, setUserName, setUserNickname, setUserPhone, setUserEmail, isLogin, setIsLogin} = context;

    // 키보드 입력 받기
    const [loginId, setLoginId] = useState(""); // 로그인 아이디
    const [loginPw, setLoginPw] = useState(""); // 로그인 비밀번호

    // 오류 메시지
    const [loginIdOkMsg, setLoginIdOkMsg] = useState("");
    const [loginIdMsg, setLoginIdMsg] = useState("");
    const [loginPwOkMsg, setLoginPwOkMsg] = useState("");
    const [loginPwMsg, setLoginPwMsg] = useState("");

    // 유효성 검사
    const [isLoginId, setIsLoginId] = useState(false);
    const [isLoginPw, setIsLoginPw] = useState(false);

    // 정규식
    const idRegEx = /^[A-Za-z0-9]{3,15}$/g;
    const pwRegEx = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{8,20}$/;

    const onChangeLoginId = (e) => {
      const loginInputId = e.target.value;
      setLoginId(loginInputId);
      if(!idRegEx.test(loginInputId)) {
          setIsLoginId(false);
          setLoginIdMsg("3~15자리 영문자 또는 숫자를 입력하세요.");
      } else {
          setIsLoginId(true);
          setLoginIdOkMsg("");
      }
    }

    const onChangeLoginPw = (e) => {
      const loginInputPw = e.target.value ;
      setLoginPw(loginInputPw);

      if (!pwRegEx.test(loginInputPw)) {
          setIsLoginPw(false);
          setLoginPwMsg("8~20자리 소문자, 숫자, 특수문자를 입력하세요.");
      } else {
          setIsLoginPw(true);
          setLoginPwOkMsg("");
      }        
    }

    const handleOnKeyPress = e => {
        if(e.key === 'Enter') {
            onClickLogin();
        }
    }
  
    const onClickLogin = async() => {
      try {
        const response = await AccountApi.getToken(loginId, loginPw);
        if(response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("isLogin", "TRUE");
          localStorage.setItem("userId", loginId);
          localStorage.setItem("userPw", loginPw);
          console.log("토큰 발급 완료")
          console.log(response);
          try {
            const response2 = await AccountApi.userInfo();
            const userData = JSON.stringify(response2, null, 2);
            const userDataObject = JSON.parse(userData);
            console.log(userDataObject.data[0].userId);
            setUserId(userDataObject.data[0].userId);
            setUserPw(loginPw);
            setUserNickname(userDataObject.data[0].userNickname);
            setUserName(userDataObject.data[0].userName);
            setUserPhone(userDataObject.data[0].userPhone);
            setUserEmail(userDataObject.data[0].userEmail);
          } catch(e) {
            console.log(e);
          }
          navigate("/");
        }
      } catch(e) {
        console.log(e);
      }
    };

    const onClickKakaoLogin = () => {
      const Rest_api_key = '088a7b267c39d0a11ec3904372ed9d33';
      const redirect_uri = 'http://localhost:8111/auth/kakao/callback';
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
      window.location.href = kakaoURL;
    };
    
    const handleKakaoCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      try {
        const response = await fetch(`/auth/kakao/callback?code=${code}`);
        if (response) {
          const tokenDto = await response.json();
          console.log("백엔드에서 반환된 데이터:");
          console.log(tokenDto);
          window.location.replace('/'); // 메인 페이지로 이동
        } else {
          console.log("요청 실패:", response.status);
          window.location.href = '/main'; // 메인 페이지로 이동 (실패 시)
        }
      } catch (e) {
        console.log("오류 발생:", e);
        window.location.href = '/main'; // 메인 페이지로 이동 (오류 발생 시)
      }
    };
    
    // 리다이렉트 후에 실행될 코드
    if (window.location.pathname === '/auth/kakao/callback') {
      handleKakaoCallback();
    }
      
    
    return (
      <div className="wrapper">
        <div className="loginWrapper">
          <div className="login">
            <h2>로그인</h2>
            <div className="loginMain">
              <div className="loginSmallBox">
                <input type="text" value={loginId} className="loginInput" placeholder="아이디" onChange={onChangeLoginId}/>
              </div>
              <div className="loginErrMsg">
                {!isLoginId && <span className="loginIdErr">{loginIdMsg}</span>}
                {isLoginId && <span className="loginIdOk">{loginIdOkMsg}</span>}
              </div>
              <div className="loginSmallBox">
                <input type="password" value={loginPw} className="loginInput" placeholder="패스워드" onChange={onChangeLoginPw} onKeyUp={handleOnKeyPress}/>
              </div>
              <div className="loginErrMsg">
                {!isLoginPw && <span className="loginPwErr">{loginPwMsg}</span>}
                {isLoginPw && <span className="loginPwOk">{loginPwOkMsg}</span>}
              </div>
              <div className="IdPwdSearchButtonBox">
                <Link to="/find" className="IdPwdSearchButton">아이디 / 패스워드 찾기</Link>
                <Link to="/join" className="JoinButton">회원 가입</Link>
              </div>
              <button className="loginButton" onClick={onClickLogin}>로그인</button>
              <button className="kakaoLogin" onClick={onClickKakaoLogin}>kakao 로그인</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Login;