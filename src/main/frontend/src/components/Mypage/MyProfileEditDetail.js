import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountApi from "../../api/AccountApi";
import { AccountInfoContext } from "../../context/AccountInfo";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";

const Table = styled.table`
  width: 100%;
  height: 400px;
  border-collapse: collapse;
  margin-bottom: 15px;
  margin-left:-10px;
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:0px;
  background-color: #f8f8f8;
  width: 100%;
  height: 110vh; /* 뷰포트 높이 100% */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  height: 100%;
  background-color: white;
  width: 100%; 
  max-width: 700px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 가로로 배치 */
  align-items: center; /* 가운데 정렬 */
  margin-bottom: 10px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;

  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 16px; /* 원하는 크기로 조정 */
  box-sizing: border-box; /* padding이 width를 변경하지 않도록 box-sizing 설정 */
  align-items: center;

  @media (min-width: 360px) {
    width: 200px; /* 기기 너비가 360px 이상일 때 일정한 크기로 설정 */
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #990a2c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 250px;
  width: 36%;
  margin-bottom: 25px;
`;
const Span = styled.td`
  color: black;
  font-size: 20px;
  margin-bottom: 30px;
  width: 100px;
  white-space: nowrap;

`;

const ErrorMessage = styled.td`
  color: red;
  margin-top: 5px;
`;

const MyProfileEditDetail = () => {
  const navigate = useNavigate();
  
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  // 변경할 프로필 변수
  const [password, setPassword] = useState(localStorage.getItem("userPw"));
  const [conPassword, setConPassword] = useState(localStorage.getItem("userPw"));
  const [nickname, setNickname] = useState(userInfo.userNickname);
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
  const [isAll, setIsAll] = useState(false);
  
  useEffect(() => {
    if(userInfo)
      setPhone(userInfo.userPhone);
      setEmail(userInfo.userEmail);
      setPassword(password);
      setConPassword(conPassword);
  }, [userInfo]);

  const onChagePw = (e) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    setPassword(e.target.value);
    if (!pwRegex.test(password)) {
      setPasswordMsg(
        "영문자 대/소 + 특수문자 + 숫자를 조합하여 8~20자리 이상 입력하세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMsg("");
      setIsPassword(true);
    }
  };

  const onChageConPw = (e) => {
    setConPassword(e.target.value);
  };

  useEffect(() => {
    if (password === conPassword) {
      setConPasswordMsg("");
      setIsConPassword(true);
    } else {
      setConPasswordMsg("비밀번호가 일치하지 않습니다.");
      setIsConPassword(false);
    }
  }, [password, conPassword]);

  const onChageNickname = (e) => {
    const nicknameRegex = /^(?=.*[a-zA-Z0-9ㄱ-ㅎ가-힣])[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,10}$/;
    const updatedNickname = e.target.value;
    setNickname(updatedNickname);
  
    if (!nicknameRegex.test(updatedNickname)) {
      setNicknameMsg(
        "영문자 대/소 + 숫자 + 한글 조합으로 2~10자의 닉네임을 입력하세요."
      );
      setIsNickname(false);
    } else {
      setNicknameMsg("");
      setIsNickname(true);
    }
  };

  const onChagePhone = (e) => {
    const telRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    setPhone(e.target.value);
    if (!telRegex.test(phone)) {
      setPhoneMsg("'-'를 포함하여 전화번호 10-11자리를 입력하세요");
      setIsPhone(false);
    } else {
      setPhoneMsg("");
      setIsPhone(true);
    }
  };

  const onChageEmail = (e) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(e.target.value);
    if (!emailRegex.test(email)) {
      setEmailMsg("이메일 형식이 맞지 않습니다. 다시 입력해주세요.");
      setIsEmail(false);
    } else {
      setEmailMsg("");
      setIsEmail(true);
    }
  };

  const updateInfo = async () => {
    try {
      const response = await AccountApi.updateUserInfo(
        userInfo.userId,
        password,
        nickname,
        userInfo.userName,
        phone,
        email
      );
      navigate(-2);
      console.log("회원정보 수정", response);
    } catch (e) {
      console.log(e);
    }
  };

  const updateKakao = async() => {
    try {
      const response = await AccountApi.updateUserInfo2(userInfo.userId, nickname);
      if(response){
        console.log("회원정보 수정", response);
        navigate(-2);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <Header />
    <Container>
      {localStorage.getItem("loginValue") === "DEFAULT" ? (
        <FormContainer>
          {userInfo ? (
            <>
              <Table>
                <Span>개인정보 변경</Span>
                <tbody>
                  <tr>
                    <th>아이디</th>
                    <td>{userInfo.userId}</td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td>
                      <Input type="password" value={password} onChange={onChagePw} />
                      {passwordMsg && <ErrorMessage>{passwordMsg}</ErrorMessage>}
                    </td>
                  </tr>
                  <tr>
                    <th>비밀번호 확인</th>
                    <td>
                      <Input type="password" value={conPassword} onChange={onChageConPw} />
                      {conPasswordMsg && <ErrorMessage>{conPasswordMsg}</ErrorMessage>}
                    </td>
                  </tr>
                  <tr>
                    <th>닉네임</th>
                    <td>
                      <Input type="text" value={nickname} onChange={onChageNickname} />
                      {nicknameMsg && <ErrorMessage>{nicknameMsg}</ErrorMessage>}
                    </td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>{userInfo.userName}</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                      <Input type="text" value={phone} onChange={onChagePhone} />
                      {phoneMsg && <ErrorMessage>{phoneMsg}</ErrorMessage>}
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td>
                      <Input type="text" value={email} onChange={onChageEmail} />
                      {emailMsg && <ErrorMessage>{emailMsg}</ErrorMessage>}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button onClick={updateInfo}>수정</Button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </FormContainer>
      ) : (
        <FormContainer>
          {userInfo ? (
            <>
              <Table>
                <Span>개인정보 변경</Span>
                <tbody>
                <tr>
                    <th>닉네임</th>
                    <td>
                      <Input type="text" value={nickname} onChange={onChageNickname} />
                      {nicknameMsg && <ErrorMessage>{nicknameMsg}</ErrorMessage>}
                    </td>
                </tr>
                </tbody>
                </Table>
                <Button onClick={updateKakao}>수정</Button>
                </>
          ) : (
            <p>Loading...</p>
          )}
        </FormContainer>
      )}
    </Container>
    <Footer />
  </>
  );
};

export default MyProfileEditDetail;
