import React, { useState } from "react";
import AccountApi from "../../api/AccountApi";
import { useNavigate } from "react-router-dom";

const MyProfileEditDetail = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const userId = localStorage.getItem("userId");

  // 변경할 프로필 변수
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // 오류 메세지
  const [passwordMsg, setPasswordMsg] = useState("");
  const [conPasswordMsg, setConPasswordMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(false);
  const [isConPassword, setIsConPassword] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const [inputPw, setInputPw] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const [isPwd, setIsPwd] = useState(false);

  const fetchUserInfo = async () => {
    try {
    const response = await AccountApi.checkMemberPw(userId, inputPw);
    if (response) {
      console.log(response.data);
        setUserInfo(response.data[0]);
        setIsPwd(true);
    } else {
        console.log("데이터가 없음");
        setCheckPwMsg("패스워드가 일치하지 않습니다.")
    }
    } catch (error) {
    console.log(error);
    }
  };

  const onChageCheckInputPw = (e) => {
    setInputPw(e.target.value);
  }

  const onChagePw = (e) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    setPassword(e.target.value);
    if(!pwRegex.test(password)){
        setPasswordMsg("영문자 대/소 + 특수문자 + 숫자를 조합하여 8~20자리 이상 입력하세요.")
        setIsPassword(false);
    } else {
        setPasswordMsg("");
        setIsPassword(true);

    }
  }

  const onChageConPw = (e) => {
    setConPassword(e.target.value);
    if(conPassword !== password){
        setConPasswordMsg("비밀번호가 일치하지 않습니다.");
        setIsConPassword(false);
    } else {
        setConPasswordMsg("");
        setIsConPassword(true);
    }
  }

  const onChageNickname = (e) => {
    const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/;
    setNickname(e.target.value);
    if(!nicknameRegex.test(nickname)){
        setNicknameMsg("영문자 대/소 + 숫자 + 한글 조합으로 2~10자의 닉네임을 입력하세요.");
        setIsNickname(false);
    } else {
        setNicknameMsg("");
        setIsNickname(true);
    }
  }

  const onChagePhone = (e) => {
    const telRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    setPhone(e.target.value);
    if(!telRegex.test(phone)){
        setPhoneMsg("'-'를 포함하여 전화번호 10-11자리를 입력하세요")
        setIsPhone(false);
    } else {
        setPhoneMsg("");
        setIsPhone(true);
    }
  }

  const onChageEmail = (e) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(e.target.value);
    if(!emailRegex.test(email)){
        setEmailMsg("이메일 형식이 맞지 않습니다. 다시 입력해주세요.")
        setIsEmail(false);
    } else {
        setEmailMsg("");
        setIsEmail(true);
    }
  }

  const updateInfo = async() => {
      try {
        const response = await AccountApi.updateUserInfo(userInfo.userId, password, nickname, userInfo.userName, phone, email);
        console.log("회원정보 수정", response);
        nav("/mypage")
      } catch (e) {
        console.log(e);
      }
  }
  const userNickname = userInfo.userNickname;
  const userPhone = userInfo.userPhone;
  const userEmail = userInfo.userEmail;

  return (
    <>
    <div>
      {isPwd? (userInfo !== null ? (
          <div>
            <p>아이디: {userId}</p>
            <p>비밀번호: </p>
            <input style={{ display: "inline" }} type="password" value={password} onChange={onChagePw}/>
            <p>비밀번호 확인: </p>
            <input style={{ display: "inline" }} type="password" value={conPassword} onChange={onChageConPw}/>
            <p>닉네임: </p>
            <input style={{ display: "inline" }} type="text" value={userNickname} onChange={onChageNickname}/>
            <p>이름: {userInfo.userName}</p>
            <p>전화번호: </p>
            <input style={{ display: "inline" }} type="text" value={userPhone} onChange={onChagePhone}/>
            <p>이메일: </p>
            <input style={{ display: "inline" }} type="text" value={userEmail} onChange={onChageEmail}/>
            <button onClick={updateInfo}>수정</button>
          </div>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <>
          <input
            type="password"
            value={inputPw}
            onChange={onChageCheckInputPw}
            placeholder="패스워드"
          />
          <button onClick={fetchUserInfo}>확인</button>
          <p>{checkPwMsg}</p>
        </>
      )}
      </div>
    </>
  );
};

export default MyProfileEditDetail;