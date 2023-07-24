import React, { useState, useEffect } from "react";
import '../../styles/FindAccount.css';
import AccountApi from "../../api/AccountApi";
import MessageModal from "../../utils/MessageModal";
import { Link } from "react-router-dom";

export const FindUserId = () => {

    // 아이디 찾기 키보드 입력
    const [idUserName, setIdUserName] = useState("");
    const [idUserEmail, setIdUserEmail] = useState("");
    //팝업창
    const [findIdSuccess, setFindIdSuccess] = useState(false);
    const [findIdFail, setFindIdFail] = useState(false);

    //모달창 닫기
    const onClickClose = () => {
        setFindIdSuccess(false);
        setFindIdFail(false);
    }

    // 아이디 찾은 값 입력
    const [findId, setFindId] = useState("");


    const onChangeIdUserName = (e) => {
        const idUserNameNow = e.target.value;
        setIdUserName(idUserNameNow);
    }

    const onChangeIdUserEmail = (e) => {
        const idUserEmailNow = e.target.value;
        setIdUserEmail(idUserEmailNow);
    }

    // 이름과 메일 입력 값을 axios로 회원조회 접근 코드
    const onClickFindId = async() => {
        try {
            const response = await AccountApi.findMemberId(idUserName, idUserEmail);
            if(response){
                setFindId(response.data);
                setFindIdSuccess(true);
                console.log(response.data);
            }
        } catch(e) {
            console.log("일치하는 회원정보가 없습니다.");
            setFindIdFail(true);
        }
    }

    const handleOnKeyPress = e => {
        if(e.key === 'Enter') {
            onClickFindId();
        }
    }

    return (
        <>
        <div className="loginWrapper">
          <div className="login">
            <h2>아이디 찾기</h2>
            <div className="loginMain">
              <div className="loginSmallBox">
                <input type="text" value={idUserName} className="loginInput" placeholder="사용자 이름을 입력하세요." onChange={onChangeIdUserName} onKeyUp={handleOnKeyPress}/>
              </div>
              <div className="loginSmallBox">
                <input type="text" value={idUserEmail} className="loginInput" placeholder="사용자 이메일을 입력하세요." onChange={onChangeIdUserEmail} onKeyUp={handleOnKeyPress}/>
              </div>
              <div className="IdPwdSearchButtonBox">
                <Link to="/login" className="FindIdPageLoginButton">로그인</Link>
                <Link to="/find/pw" className="FindIdPagePwButton">패스워드 찾기</Link>
                <Link to="/join" className="JoinButton">회원 가입</Link>
              </div>
              <button className="loginButton" onClick={onClickFindId}>아이디 찾기</button>
            </div>
          </div>
        </div>
        {findIdSuccess && (<MessageModal open={findIdSuccess} confirm={onClickClose} close={onClickClose} type="modalType" header="아이디 확인">아이디 찾기 결과 : {findId}</MessageModal>)}
        {findIdFail && (<MessageModal open={findIdFail} confirm={onClickClose} close={onClickClose} type="modalType" header="아이디 확인">아이디를 찾을 수 없습니다.</MessageModal>)}
        </>
    );
};

export default FindUserId;