import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AccountApi from "../../api/AccountApi";
import profile from "../../images/mypageicon2.png";

const MenuBlock = styled.div`
    text-align: center;
    position: relative;
    transform: translate(-50%, -50%);
    top: 250px;
    left: 50%;
    @media (max-width:768px) {
        width: 100%;
        height: 1050px;
    }
    @media (max-width:412px) {
        width: 100%;
        height: auto;
    }
    @media (max-width:360px) {
        width: 100%;
        height: auto;
    }


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
        clip-path: circle(40% at center);
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
    const [userNickname, setUserNickname] = useState("");
    const userId = localStorage.getItem("userId");
    useEffect(()=> {
        const recentData = async() => {
            try {
                const userData = await AccountApi.getUserInfo(userId);
                console.log(userData);
                if(userData.data) {
                    const userInfoData = JSON.stringify(userData.data);
                    localStorage.setItem("userInfo", userInfoData);
                    setUserNickname(userData.data.userNickname);
                } else {
                    console.log("불러오기 실패");
                }
            } catch (e) {
                console.log(e);
            }
        }
        recentData();
    }, [])
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);

    const imageUrl = userInfo.imgUrl || profile;
    return (
        <MenuBlock>
            <div className="pageheader">마이페이지</div>
            <div className="profile">
                <img className="picture" src={imageUrl} alt="Profile" />
            </div>
            <div className="name">{userNickname}</div>
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