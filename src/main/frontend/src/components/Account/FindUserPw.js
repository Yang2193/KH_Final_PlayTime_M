import React, { useState, useEffect } from "react";
import '../../styles/FindAccount.css';
import AccountApi from "../../api/AccountApi";
import MessageModal from "../../utils/MessageModal";
import { Link } from "react-router-dom";

const FindUserPw = () => {
// 패스워드 찾기 키보드 입력
const [pwUserId, setPwUserId] = useState("");
const [pwUserName, setPwUserName] = useState("");
const [pwUserEmail, setPwUserEmail] = useState("");

// 패스워드 찾은 값 입력
const [findPw, setFindPw] = useState("");
//팝업
const [findPwSuccess, setFindPwSuccess] = useState(false);
const [findPwFail, setFindPwFail] = useState(false);
//모달창 닫기
const onClickClose = () => {
    setFindPwSuccess(false);
    setFindPwFail(false);
}
const onChangePwUserId = (e) => {
    const pwUserIdNow = e.target.value;
    setPwUserId(pwUserIdNow);
}

const onChangePwUserName = (e) => {
    const pwUserNameNow = e.target.value;
    setPwUserName(pwUserNameNow);
}

const onChangePwUserEmail = (e) => {
    const pwUserEmailNow = e.target.value;
    setPwUserEmail(pwUserEmailNow);
}

// 아이디, 이름, 메일 입력 값을 axios로 회원조회 접근
const onClickFindPw = async() => {
    try {
        const response = await AccountApi.findMemberPw(pwUserId, pwUserName, pwUserEmail);
        if(response) {
            setFindPw(response.data);
            setFindPwSuccess(true);
            console.log(response.data);
        } else {
            setFindPwFail(true);
            console.log(response);
        }
    } catch(e) {
        console.log("일치하는 회원정보가 없습니다.");
        console.log(e);
    }
}
const handleOnKeyPress = e => {
    if(e.key === 'Enter') {
        onClickFindPw();
    }
}

return (
    <>
    <div className="loginWrapper">
        <div className="login">
        <h2>패스워드 찾기</h2>
            <div className="loginMain">
                <div className="loginSmallBox">
                <input type="text" value={pwUserId} className="loginInput" placeholder="사용자 아이디를 입력하세요." onChange={onChangePwUserId} onKeyUp={handleOnKeyPress}/>
                </div>
                <div className="loginSmallBox">
                <input type="text" value={pwUserName} className="loginInput" placeholder="사용자 이름을 입력하세요." onChange={onChangePwUserName} onKeyUp={handleOnKeyPress}/>
                </div>
                <div className="loginSmallBox">
                <input type="text" value={pwUserEmail} className="loginInput" placeholder="사용자 이메일을 입력하세요." onChange={onChangePwUserEmail} onKeyUp={handleOnKeyPress}/>
                </div>
                <div className="IdPwdSearchButtonBox">
                <Link to="/login" className="FindIdPageLoginButton">로그인</Link>
                <Link to="/find/id" className="FindIdPagePwButton">아이디 찾기</Link>
                <Link to="/join" className="JoinButton">회원 가입</Link>
                </div>
                <button className="loginButton" onClick={onClickFindPw}>패스워드 찾기</button>
            </div>
        </div>
    </div>
    {findPwSuccess && (<MessageModal open={findPwSuccess} confirm={onClickClose} close={onClickClose} type="modalType" header="패스워드 찾기">회원님의 이메일로 임시패스워드가 발송 되었습니다.</MessageModal>)}
    {findPwFail && (<MessageModal open={findPwFail} confirm={onClickClose} close={onClickClose} type="modalType" header="패스워드 찾기">일치하는 회원 정보가 없습니다.</MessageModal>)}
    </>
    );
};

export default FindUserPw;