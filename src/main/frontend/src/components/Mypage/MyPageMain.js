import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AccountApi from "../../api/AccountApi";
import profile from "../../images/mypageicon2.png";

const MenuBlock = styled.div`
    width: 768px;
    height: auto;
    text-align: center;
    position: relative;
    transform: translate(-50%, -50%);
    top: 250px;
    left: 50%;

    .profile {
        width: 150px;
        height: 150px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: relative;
    }
    
    .profile img {
        display: block;
        height: 70%;
        margin-left: auto;
        margin-right: auto;
    }

    .pageheader {
        margin: 0 auto;
        padding: 12px 20px;
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        line-height: 25px;
        color: black;
        border-bottom: 0.3px solid #D8D8D8;
        font-weight: 500;
        font-size: 25px;
        text-align: center;
    }

    .name {
        font-weight: bold;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 0.3px solid #D8D8D8;
        text-align: center;
        color: black;
        padding-left: 0px;
        padding-top: 10px;
        padding-bottom: 18px;
    }

    a {
        text-decoration: none;
    }

    .selector {
        box-sizing: border-box;
        margin: 0 auto;
    }

    .selector div {
        padding: 12px 20px;
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        line-height: 25px;
        color: #848484;
        border-bottom: 0.3px solid #D8D8D8;
        font-weight: 500;
        text-align: center;
    }
`;

const MyPageMain = () => {
    
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);
    console.log(userInfo)

    return (
        <MenuBlock>
            <div className="pageheader">마이페이지</div>
            <div className="profile">
                <img className="picture" src={profile} alt="Profile" />
            </div>
            <div className="name">{userInfo.userNickname}</div>
            <div className="selector">
                <Link to="/mypage/profile_edit"><div>프로필 수정</div></Link>
                <Link to="/myPage/review"><div>내가 쓴 후기</div></Link>
                <Link to="/myPage/comment"><div>내가 쓴 댓글</div></Link>
                <Link to="/myPage/playlike"><div>찜 목록</div></Link>
                <Link to="/myPage/buylist"><div>구매한 티켓</div></Link>
            </div>
        </MenuBlock>
    );
}

export default MyPageMain;