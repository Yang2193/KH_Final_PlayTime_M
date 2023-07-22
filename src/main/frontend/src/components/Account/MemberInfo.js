import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageModal from "../../utils/MessageModal";
import AccountApi from "../../api/AccountApi";
import styled from "styled-components";
const Container = styled.div`
margin-top:30px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
`;

const SignUpForm = styled.div`
  width: 430px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &.focused {
      border: 2px solid #007bff;
    }
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 30px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .message {
    color: red;
  }
`;
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
    const [inputAuth, setInputAuth] = useState("");


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
    const [isAuth, setIsAuth] = useState(false);

    // 모든 항목 체크
    const [isAllChecked, setIsAllChecked] = useState(false);

    //팝업창
    const [isAllCheckModalOpen, setIsAllCheckModalOpen] = useState(false);
    const [authSuccessModal, setAuthSuccessModal] = useState(false);
    const [authFailModal, setAuthFailModal] = useState(false);
    const [idchecksuccess, setIdchecksuccess] = useState(false);
    const [idcheckfail, setIdcheckfail] = useState(false);
    const [idcheckNull, setIdcheckNull] = useState(false);
    const [authEmail, setAuthEmail] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);

    //모달창 닫기
    const onClickClose = () => {
        setIsAllCheckModalOpen(false);
        setAuthSuccessModal(false);
        setAuthFailModal(false);
        setIdchecksuccess(false);
        setIdcheckfail(false);
        setIdcheckNull(false);
        setAuthEmail(false);
        setSignUpModal(false);
    }

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

    const onChangeAuth = (e) => {
        const authNow = e.target.value;
        setInputAuth(authNow);
    }
    const onClickIdCheck = async () => {
        if(inputId === "") {
            setIdcheckNull(true);
        } else {
            try {
            const response = await AccountApi.userIdCheck(inputId);
            if (response.data === false) {
                console.log("중복된 아이디 없음.");
                setIdchecksuccess(true);
                setIsId(true);
            } else if (response.data === true) {
                console.log("아이디가 중복 되었음.");
                setIdcheckfail(true);
                setIsId(false);
                setIdError("중복 아이디가 존재합니다.");
            } else {
                console.log("서버 응답 형식이 올바르지 않습니다.");
            }
            } catch (e) {
            console.log(e);
            }
        }
      };

    const onClickEmailAuth = async() => {
        if(isEmail) {
            try {
                const response = await AccountApi.sendAuthEmail(inputEmail);
                setAuthEmail(true);
                console.log(response);
                localStorage.setItem("authCode", response.data);
            } catch (e){
                console.log(e);
            }
        }
    }

    const onClickIsAuth = async() => {
        if(localStorage.getItem("authCode") === inputAuth) {
            setAuthSuccessModal(true);
            setIsAuth(true);
        } else {
            setAuthFailModal(true);
        }
    }

    const onClickSignUp = async() => {
        if(isAllChecked){
            try {
                const response = await AccountApi.memberReg(inputId, inputPw, inputNickname, inputName, inputEmail, inputPhone);
                if(response.status === 200) {
                    console.log(response.data.message);
                    setSignUpModal(true);
                }
            } catch(e) {
                console.log(e);
            }
        }else {
            // isAllChecked가 false일 때 모달창 열기
            setIsAllCheckModalOpen(true);
        }
    };

    useEffect(() => {
        if (isId && isPw && isPwCk && isEmail && isName && isPhone && isAuth) {
            setIsAllChecked(true);
            console.log(isAllChecked);
            console.log(inputId, inputPw, inputName, inputPhone, inputEmail, isAuth);
        } else {
            setIsAllChecked(false);
            setAllCheckError("필수 회원 정보를 모두 입력 하지 않았습니다.")
        }
    }, [isId, isPw, isPwCk, isEmail, isName, isPhone, isAuth]);

        const onClickPre = () => {
            navigate("/login");
        }
//sdsdsd
    return (
        <div>
        {/* FORM SECTION */}
            <Container>
                {/* SIGN UP */}
                <SignUpForm>
                    <div>
                        <div>
                            <div>
                                <i></i>
                                <input type="text" placeholder="User ID" value={inputId} onChange={onChangeUserId} className={isId ? 'focused-id' : ''}/>
                                <button onClick={onClickIdCheck}>중복확인</button>
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
                                <button onClick={onClickEmailAuth} disabled={!isId || !isPw || !isNickname || !isName || !isPhone || !isEmail}>인증번호 받기</button>
                            </div>
                            <div>
                                <input type="password" value={inputAuth} onChange={onChangeAuth}/>
                                <button onClick={onClickIsAuth}>인증</button>
                            </div>
                            <div>
                                {inputEmail.length > 0 && <span className={`message ${isEmail ? '' : 'error'}`}>{emailError}</span>}
                            </div>
                            <div>
                                <button onClick={onClickPre}>이전</button>
                                <button onClick={onClickSignUp}>다음</button>
                            </div>
                        </div>
                    </div>
                </SignUpForm>
            </Container>
            {isAllCheckModalOpen && (<MessageModal open={isAllCheckModalOpen} confirm={onClickClose} close={onClickClose} type="modalType" header="회원가입 오류">회원가입에 필요한 필수 정보를 작성하세요.</MessageModal>)}
            {authSuccessModal && (<MessageModal open={authSuccessModal} confirm={onClickClose} close={onClickClose} type="modalType" header="인증 완료">이메일 인증이 완료되었습니다.</MessageModal>)}
            {authFailModal && (<MessageModal open={authFailModal} confirm={onClickClose} close={onClickClose} type="modalType" header="인증 실패">이메일 인증이 실패하였습니다.</MessageModal>)}
            {idcheckfail && (<MessageModal open={idcheckfail} confirm={onClickClose} close={onClickClose} type="modalType" header="중복 확인">중복된 아이디가 있습니다.</MessageModal>)}
            {idchecksuccess && (<MessageModal open={idchecksuccess} confirm={onClickClose} close={onClickClose} type="modalType" header="중복 확인">사용 가능한 아이디 입니다.</MessageModal>)}
            {idcheckNull && (<MessageModal open={idcheckNull} confirm={onClickClose} close={onClickClose} type="modalType" header="중복 확인">입력하신 아이디가 없습니다.</MessageModal>)}
            {authEmail && (<MessageModal open={authEmail} confirm={onClickClose} close={onClickClose} type="modalType" header="이메일 인증">인증번호를 발급했습니다, 메일함을 확인해주세요</MessageModal>)}
            {signUpModal && (<MessageModal open={signUpModal} confirm={onClickPre} close={onClickPre} type="modalType" header="회원가입 완료">회원가입이 완료되었습니다. PLAYTIME에 오신 걸 환영합니다. 로그인 페이지로 이동합니다. 다시 로그인을 진행합니다.</MessageModal>)}
        </div>
    );
}

export default MemberInfo;