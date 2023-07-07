import React, { useState, useEffect } from "react";
import '../../styles/FindAccount.css';
import AccountApi from "../../api/AccountApi";

export const FindUserId = () => {

    // 아이디 찾기 키보드 입력
    const [idUserName, setIdUserName] = useState("");
    const [idUserEmail, setIdUserEmail] = useState("");
    

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
            setFindId(response.data);
            console.log(response.data);
        } catch(e) {
            console.log("일치하는 회원정보가 없습니다.");
            console.log(e);
        }
    }
    console.log(idUserName + " " + idUserEmail);

    return (
        <>
        <h2>아이디 / 패스워드 찾기</h2>
        <div className="find">
        {/* FORM SECTION */}
        <div className="find-section">
        <div className="section-id"><h3>아이디</h3></div>
        <div className="section-pw"><h3>패스워드</h3></div>
        </div>
            <div className="find-form">
            {/* FIND ID */}
                <div className="id-container">
                    <div className="find-id">
                        <div>
                            <i></i>
                            <input type="text" placeholder="User Name" value={idUserName} onChange={onChangeIdUserName} />
                        </div>
                        <div>
                            <i></i>
                            <input type="text" placeholder="User Email" value={idUserEmail} onChange={onChangeIdUserEmail} />
                        </div>
                        <button onClick={onClickFindId}>아이디 찾기</button>
                    </div>
                </div>
            {/* FIND ID */}
            </div>
        </div>
        </>
    );
};

export const FindUserPw = () => {

    // 패스워드 찾기 키보드 입력
    const [pwUserId, setPwUserId] = useState("");
    const [pwUserName, setPwUserName] = useState("");
    const [pwUserEmail, setPwUserEmail] = useState("");

    // 패스워드 찾은 값 입력
    const [findPw, setFindPw] = useState("");

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
            setFindPw(response.data);
            console.log(response.data);
        } catch(e) {
            console.log("일치하는 회원정보가 없습니다.");
            console.log(e);
        }
    }

    return (
        <>
        {/* FIND PW */}
        <div className="pw-container">
        <div className="find-pw">
            <div>
                <div>
                    <i></i>
                    <input type="text" placeholder="User ID" value={pwUserId} onChange={onChangePwUserId}/>
                </div>
                <div>
                    <i></i>
                    <input type="text" placeholder="User name" value={pwUserName} onChange={onChangePwUserName}/>
                </div>
                <div>
                    <i className="bx bxs-mail-send"></i>
                    <input type="email" placeholder="Email" value={pwUserEmail} onChange={onChangePwUserEmail}/>
                    <div>
                    <button onClick={onClickFindPw}>패스워드 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* END FIND PW */}
    </>
    );
};
