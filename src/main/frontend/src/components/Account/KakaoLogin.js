import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountApi from '../../api/AccountApi';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const LoadingContainer = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpan = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${props => props.backgroundColor};
  border-radius: 50%;
  animation: ${loadingAnimation} 1s 0s linear infinite;
  margin-right: 8px;
`;

const KakaoLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
        const getAccessToken = async () => {
        try {
            const response = await AccountApi.kakaoAccessToken(code);
            localStorage.setItem("userId", response.data.kakaoProfile.id);
            localStorage.setItem("accessToken", response.data.tokenDto.accessToken);
            localStorage.setItem("refreshToken", response.data.tokenDto.refreshToken);
            localStorage.setItem("loginValue", "KAKAO");
            localStorage.setItem("isLogin", "TRUE");
            try {
              const userInfo = await AccountApi.getUserInfo(localStorage.getItem("userId"));
              const userInfoData = JSON.stringify(userInfo.data);
              localStorage.setItem("userInfo", userInfoData);
              console.log(userInfo.data);
            } catch(e) {
            console.log(e);
            }
            console.log("토큰 발급 완료")
            navigate("/");
        } catch (error) {
            console.error('액세스 토큰 요청 실패:', error);
        }
        }
        getAccessToken();
    };
    return (
        <>
        <LoadingContainer>
            <LoadingSpan backgroundColor="#990A2C" />
            <LoadingSpan backgroundColor="#990A2C" />
            <LoadingSpan backgroundColor="#990A2C" />
        </LoadingContainer>
        </>
    )
}

export default KakaoLogin;