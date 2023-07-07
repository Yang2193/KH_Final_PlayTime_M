import React, { createContext, useEffect, useState } from "react";
import AccountApi from "../api/AccountApi";

export const AccountInfoContext = createContext();

const AccountProvider = ({children} ) => {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [withdraw, setWithdraw] = useState(false);

    useEffect(() => {
      const restoreSession = async() => {
        const token = localStorage.getItem("accessToken");
        if(token) {
          try {
            const userInfoResponse = await AccountApi.userInfo();
            const userData = userInfoResponse.data;
            setUserId(userData.userId);
            setUserPw(userData.userPw);
            setUserNickname(userData.userNickname);
            setUserName(userData.userName);
            setUserPhone(userData.userPhone);
            setUserEmail(userData.userEmail);
            setIsLogin(true);
          } catch (e) {
            console.log("오류 발생");
          }
        }
        setIsLogin(false);
      };
      restoreSession();
    },[]);

    const resetUser = () => {
      setUserId("");
      setUserPw("");
      setUserNickname("");
      setUserName("");
      setUserPhone("");
      setUserEmail("");
      setIsPwd(false);
      setWithdraw(false);
    }

    return (
        <AccountInfoContext.Provider value={{withdraw, setWithdraw, isPwd, setIsPwd, resetUser, userId, setUserId, userPw, setUserPw, userNickname, setUserNickname, userName, setUserName, userPhone, setUserPhone, userEmail, setUserEmail, isLogin, setIsLogin}}>
            {children}
        </AccountInfoContext.Provider>
    );
}
export default AccountProvider;