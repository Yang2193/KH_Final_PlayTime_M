import React, { useState, useContext, useEffect } from "react";
import { AccountInfoContext } from "../../context/AccountInfo";
import {MyProfileEditDetail, PwCheck } from "./MyProfileEditDetail";

const MyProfileEdit = () => {
  const context = useContext(AccountInfoContext);
  const {userId, userName, userNickname, isPwd} = context;

  const onClickEdit = () => {
    
  }

  return (
    <>
    {isPwd ? <MyProfileEditDetail/> : <PwCheck/>}
    </>
  );
};

export default MyProfileEdit;
