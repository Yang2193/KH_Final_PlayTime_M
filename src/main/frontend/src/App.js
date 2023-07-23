import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainPage from './pages/MainPage';
import PlayPage from './pages/PlayPage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import FindUserIdPage from './pages/FindUserIdPage';
import FindUserPwPage from './pages/FindUserPwPage';
import Mypage from './pages/MyPage';
import MyProfileEdit from './components/Mypage/MyProfileEdit';
import MyComment from './components/Mypage/MyComment';
import MyPlayLike from './components/Mypage/MyPlayLike';
import MyReview from './components/Mypage/MyReview';
import MyTicketInfo from './components/Mypage/MyTicketInfo';
import PostDetail from './pages/PostDetailPage';
import PostPage from './pages/PostPage';
import PostUpload from './pages/PostUpload';
import ReservePage from './pages/ReservePage';
import PayResult from './components/playPage/KaKaoPay/PayResult';
import PayReady from './components/playPage/KaKaoPay/PayReady';
import PostUpdate from './components/Post/PostUpdate';
import Ticket from './components/Mypage/MyTicketInfoDetail';
import MyProfileEditDetail from './components/Mypage/MyProfileEditDetail';
import KakaoLogin from './components/Account/KakaoLogin';
import KakaoLogout from './components/Account/KakaoLogout';
import { useEffect } from 'react';
import { useState } from 'react';
import Functions from './utils/Functions';

function App() {

    // 토큰 만료 여부 확인 및 갱신하는 함수
    const checkTokenExpiration = async () => {
      const userId = localStorage.getItem('userId');
      const tokenExpiresIn = Number(localStorage.getItem('expiresIn'));
      try{
        if(userId && (tokenExpiresIn < Date.now())){
              console.log(tokenExpiresIn);
              console.log(Date.now());
              
              // accessToken이 만료되었을 경우 refreshToken을 사용하여 새로운 accessToken 요청
              const newToken = await Functions.tokenRenewalV2();
                if (newToken === 200) {
                  console.log("토큰 재발급");
                } else {
                  console.log("리프레쉬 토큰이 없거나 틀립니다. 재발급 요청");
                  // refreshToken이 없는 경우 로그인 화면으로 이동 등의 처리
                  // 로그인 화면으로 이동하는 로직 구현
                }
            } else{
              console.log("토큰 만료시간 남았습니다.");
            }   
      } catch(error){
        console.log(error);
        console.log("리프레쉬 토큰이 없음.");
        localStorage.clear(); //서버가 꺼졌다 켜졌을 때 로컬스토리지에 userId랑 만료기간 남아있을 때, 서버에는 리프레쉬 토큰이 남아있지 않으므로 에러 발생.
      }      
    };

    useEffect(() => {
      checkTokenExpiration();
      // 주기적으로 토큰 체크를 위한 interval 설정 ( 30분마다 체크)
      const interval = setInterval(checkTokenExpiration, 1800000); // 10분(60초 * 1000밀리초 * 10분 = 600000밀리초)

      // 컴포넌트가 언마운트되면 interval 해제
      return () => clearInterval(interval);
    }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/info" element={<PlayPage />} />
        <Route path="/join/*" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/auth/kakao/logout" element={<KakaoLogout />} />
        <Route path="/find/id" element={<FindUserIdPage />} />
        <Route path="/find/pw" element={<FindUserPwPage />} />
        <Route path="/myPage" element={<Mypage />} />
        <Route path="/mypage/profile_edit" element={<MyProfileEdit />} />
        <Route path="/mypage/profile_edit/info" element={<MyProfileEditDetail />} />
        <Route path="/myPage/comment" element={<MyComment />} />
        <Route path="/myPage/playlike" element={<MyPlayLike />} />
        <Route path="/myPage/buylist" element={<MyTicketInfo />} />
        <Route path="/myPage/review" element={<MyReview />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/postUpload" element={<PostUpload />} />
        <Route path="/postupdate/:postId" element={<PostUpdate />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/payResult" element={<PayResult />} />
        <Route path="/payReady" element={<PayReady />} />
        <Route path="/ticket/:reserveId" element={<Ticket/>}/>
      </Routes>
    </Router>
  );
}

export default App;