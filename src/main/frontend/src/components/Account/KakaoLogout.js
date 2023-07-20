import React from "react";
import AccountApi from "../../api/AccountApi";
import { useNavigate } from "react-router-dom";
import styled, {keyframes} from "styled-components";

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

const KakaoLogout = () => {
    const accessToken = localStorage.getItem("kakaoAccessToken");
    const navigate = useNavigate();
    const kakaoLogout = async() => {
        try {
            const response = await AccountApi.kakaologout(accessToken);
            if (response) {
                localStorage.clear();
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    }
    kakaoLogout();
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

export default KakaoLogout;