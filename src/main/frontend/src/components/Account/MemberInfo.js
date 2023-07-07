import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Account.css"
import AccountApi from "../../api/AccountApi";

const MemberInfo = () => {
    const navigate = useNavigate();

    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputPwCk, setInputPwCk] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputNickname, setInputNickname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    

    // 오류 메세지
    const [idError, setIdError] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwCkError, setPwCkError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [allCheckError, setAllCheckError] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwCk, setIsPwCk] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNickname, setIsNickname] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    // 모든 항목 체크
    const [isAllChecked, setIsAllChecked] = useState(false);

    useEffect(() => {
        if (isId && isPw && isPwCk && isEmail && isName && isPhone) {
            setIsAllChecked(true);
            console.log(isAllChecked);
            console.log(inputId, inputPw, inputName, inputPhone, inputEmail);
        } else {
            setIsAllChecked(false);
            setAllCheckError("필수 회원 정보를 모두 입력 하지 않았습니다.")
        }
    }, [isId, isPw, isPwCk, isEmail, isName, isPhone]);

    const onChangeUserId = (e) => {
        const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}$/
        // 아이디 정규표현식(4자리이상 15자리이내)
        const idNow = e.target.value;
        setInputId(idNow);
        if(!idRegex.test(idNow)) {
            setIdError("4자리 이상 15자리 이하로 만드세요.");
            setIsId(false);
        } else {
            setIsId(true);
        }
    };

    const onChangeUserPw = (e) => {
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        // 비밀번호 정규표현식(숫자+영문자 및 특수문자 조합으로 8자리 이상)
        const pwNow = e.target.value;
        setInputPw(pwNow);
        if(!pwRegex.test(pwNow)) {
            setPwError("비밀번호는 숫자+영문+특수문자로 조합해주세요.");
            setIsPw(false);
        } else {
            setPwError("");
            setIsPw(true);
        }
    };

    const onChangeUserPwCk = (e) => {
        const pwCkNow = e.target.value;
        setInputPwCk(pwCkNow);
        if (pwCkNow !== inputPw) {
            setPwCkError("비밀번호가 일치하지 않습니다.");
            setIsPwCk(false);
        } else {
            setPwCkError("");
            setIsPwCk(true);
        }
    };

    const onChangeSignUserName = (e) => {
        const nameNow = e.target.value;
        setInputName(nameNow); 

        if(nameNow.length < 2 || nameNow.length > 10) {
            setIsName(false);
        } else {
            setIsName(true);
        }
    };

    const onChangeSignUserNickname = (e) => {
        const nicknameNow = e.target.value;
        setInputNickname(nicknameNow); 

        if(nicknameNow.length < 2 || nicknameNow.length > 10) {
            setIsNickname(false);
        } else {
            setIsNickname(true);
        }
    };

    const onChangeSignUserTel = (e) => {
        const telRegEx = /^\d{2,3}-\d{3,4}-\d{4}$/; // 전화번호 정규표현식
        const telNow = e.target.value;
        setInputPhone(telNow);

        if(!telRegEx.test(telNow)) {
            setPhoneError('전화번호 형식이 맞지 않아요 다시 입력해주세요.')
            setIsPhone(false)
        } else {
            setPhoneError('');
            setIsPhone(true);
        }
    };

    const onChangeUserEmail = (e) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; // 이메일 정규표현식
        const emailNow = e.target.value ;
        setInputEmail(emailNow);

        if (!emailRegex.test(emailNow)) {
            setEmailError('이메일 형식이 맞지 않습니다. 다시 입력해주세요.');
            setIsEmail(false)
        } else {
            setEmailError('');
            setIsEmail(true);
        }        
    };

    const conClickSignUp = async() => {
        try {
            const response = await AccountApi.memberReg(inputId, inputPw, inputNickname, inputName, inputEmail, inputPhone);
            if(response.status === 200) {
                console.log(response.data.message);
                navigate("/login");
            }
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <div>
        {/* FORM SECTION */}
            <div>
                {/* SIGN UP */}
                <div>
                    <div>
                        <div>
                            <div>
                                <i></i>
                                <input type="text" placeholder="User ID" value={inputId} onChange={onChangeUserId} className={isId ? 'focused-id' : ''}/>
                            </div>
                            <div>
                                {isId.length > 0 && <span className={`message ${isId ? '' : 'error'}`}>{idError}</span>}
                            </div>
                            <div>
                                {/* <button onClick={onClickIdCheck}>중복 확인</button> */}
                            </div>
                            <div>
                                <i></i>
                                <input type="password" placeholder="Password" value={inputPw} onChange={onChangeUserPw} className={isPw && (inputPw === inputPwCk) ? 'focused-pw' : ''}/>
                            </div>
                            <div>
                                {inputPw.length > 0 && <span className={`message ${isPw ? '' : 'error'}`}>{pwError}</span>}
                            </div>
                            <div>
                                <i></i>
                                <input type="password" placeholder="Confirm password" value={inputPwCk} onChange={onChangeUserPwCk} className={isPw && (inputPw === inputPwCk) ? 'focused-pw' : ''}/>
                            </div>
                            <div>
                                {inputPwCk.length > 0 && <span className={`message ${inputPwCk === inputPw ? '' : 'error'}`}>{pwCkError}</span>}
                            </div>
                            <div>
                                <i></i>
                                <input type="text" placeholder="User Nickname" value={inputNickname} onChange={onChangeSignUserNickname} className={isNickname ? 'focused-nickname' : ''}/>
                            </div>
                            <div>
                                <i></i>
                                <input type="text" placeholder="User name" value={inputName} onChange={onChangeSignUserName} className={isName ? 'focused-name' : ''}/>
                            </div>
                            <div>
                                {inputName.length > 0 && <span className={`message ${isName ? '' : 'error'}`}>{nameError}</span>}
                            </div>
                            <div>
                                <i></i>
                                <input type="text" placeholder="User phone" value={inputPhone} onChange={onChangeSignUserTel} className={isPhone ? 'focused-tel' : ''}/>
                            </div>
                            <div>
                                {inputPhone.length > 0 && <span className={`message ${isPhone ? '' : 'error'}`}>{phoneError}</span>}
                            </div>
                            <div>
                                <i></i>
                                <input type="email" placeholder="Email" value={inputEmail} onChange={onChangeUserEmail} className={isEmail ? 'focused-email' : ''}/>
                                <div><button>인증</button></div>
                            </div>
                            <div>
                                {inputEmail.length > 0 && <span className={`message ${isEmail ? '' : 'error'}`}>{emailError}</span>}
                            </div>
                            <div>
                                <button>이전</button>
                                <button onClick={conClickSignUp}>다음</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberInfo;