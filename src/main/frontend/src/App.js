import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainPage from './pages/MainPage';
import PlayPage from './pages/PlayPage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import FindAccountPage from './pages/FindAccountPage';
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
import AccountProvider from './context/AccountInfo';
import PayResult from './components/playPage/KaKaoPay/PayResult';
import PayReady from './components/playPage/KaKaoPay/PayReady';
import PostUpdate from './components/Post/PostUpdate';
import Ticket from './components/Mypage/MyTicketInfoDetail';
// import KakaoLogin from './components/Account/KakaoLogin';

function App() {
  return (
    <AccountProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/info" element={<PlayPage />} />
        <Route path="/join/*" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/kakao/login" element={<KakaoLogin />} /> */}
        <Route path="/find" element={<FindAccountPage />} />
        <Route path="/myPage" element={<Mypage />} />
        <Route path="/mypage/profile_edit" element={<MyProfileEdit />} />
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
    </AccountProvider>
  );
}

export default App;
