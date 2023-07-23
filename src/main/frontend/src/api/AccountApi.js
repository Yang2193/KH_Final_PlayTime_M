import axios from "axios";
import Functions from "../utils/Functions";

const Domain = "http://localhost:8111";

const AccountApi = {
    // 토큰 GET 로그인
    getToken : async(userId, userPw) => {
        const auth = {
            userId: userId,
            userPw: userPw
        };
        return await axios.post("/auth/login", auth);
    },

    // 중복아이디 체크
    userIdCheck: async(userId) => {
        const userIdCheckcmd = {
            userId: userId
        };
        return await axios.post("/auth/userIdCheck", userIdCheckcmd)
    },

    // 회원가입
    memberReg : async(userId, userPw, userNickname, userName, userEmail, userPhone) => {
        const memberInfo = {
            userId: userId,
            userPw: userPw,
            userNickname: userNickname,
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone
        };
        return await axios.post("/auth/signup", memberInfo);
    },

    // 회원조회
    getUserInfo : async(userId) => {
        const infoData = {
            userId: userId
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/member/userinfo", infoData);
        } catch(error) {
            await Functions.handleApiError(error);
            return await axios.post("/member/userinfo", infoData);
        }

    },

    // 회원탈퇴
    memeberDel : async(userId) => {
        const memberDelCmd = {
            userId: userId
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/auth/userdelete", memberDelCmd);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/auth/userdelete", memberDelCmd);
        }

    },

    // 아이디 / 패스워드 찾기
    findMemberId : async(userName, userEmail) => {
        const findId = {
            userName: userName,
            userEmail: userEmail
        };
        return await axios.post("/auth/find/id", findId);
    },

    findMemberPw: async (userId, userName, email) => {
        const findPw = {
            userId: userId,
            userName: userName,
            userEmail: email
        };
        return await axios.post("/auth/find/pw", findPw);
    },

    // 회원가입 시 이메일 인증
    sendAuthEmail: async(userEmail) => {
        const sendAuthEmailcmd = {
            userEmail: userEmail
        };
        return await axios.post("/auth/sendAuthEmail", sendAuthEmailcmd);
    },

    // 마이페이지 회원 별 리뷰 가져오기
    getMemberReview : async(userId) => {
        const getReview = {
            userId: userId
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/mypage/post", getReview);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/mypage/post", getReview);
        }
    },

    // 마이페이지 댓글 가져오기

    getMemberComment: async(userId) => {
        const getMemberCommentcmd = {
            userId: userId
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/mypage/comment", getMemberCommentcmd);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/mypage/comment", getMemberCommentcmd);
        }
    },

    checkMemberPw: async(userId, userPw) => {
        const checkMemberPwcmd = {
            userId: userId,
            userPw: userPw
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/mypage/checkmemberPw", checkMemberPwcmd);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/mypage/checkmemberPw", checkMemberPwcmd);
        }

    },

    updateUserInfo: async(userId, userPw, userNickname, userName, userPhone, userEmail, imageUrl) => {
        const updateUserInfocmd = {
            userId: userId,
            userPw: userPw,
            userNickname: userNickname,
            userName: userName,
            userPhone: userPhone,
            userEmail: userEmail,
            imageUrl: imageUrl
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/mypage/edit", updateUserInfocmd);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/mypage/edit", updateUserInfocmd);
        }
    },

    updateUserInfo2: async(userId, userNickname, imageUrl) => {
        const updateUserInfo2cmd = {
            userId: userId,
            userNickname: userNickname,
            imageUrl: imageUrl
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/mypage/edit2", updateUserInfo2cmd);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/mypage/edit2", updateUserInfo2cmd);
        }

    },

    buyTicketList: async(userId) => {
        const buyListcmd = {
            userId: userId
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/mypage/buylist", buyListcmd);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/mypage/buylist", buyListcmd);
        }
    },

    withdraw: async(userId) => {
        const withdrawcmd = {
            userId: userId
        };
        try {
            Functions.setAuthorizationHeader();
            return await axios.post("/mypage/withdraw", withdrawcmd);
        } catch (error) {
            await Functions.handleApiError(error);
            return await axios.post("/mypage/withdraw", withdrawcmd);
        }

    },

    ticketDetail: async(reserveId) =>{
        try{
            Functions.setAuthorizationHeader();
            return await axios.get(`/mypage/ticket/${reserveId}`);
        } catch(error){
            await Functions.handleApiError(error);
            return await axios.get(`/mypage/ticket/${reserveId}`);
        }
    },

    kakaoAccessToken: async(code) => {
        const kakaoAccessTokencmd = {
            code: code
        }
        return await axios.post(`/auth/kakao/callback`, kakaoAccessTokencmd)
    },

    kakaologout: async(token) => {
        const kakaoAccessTokencmd = {
            token: token
        };
        return await axios.post(`/auth/kakao/logout`, kakaoAccessTokencmd);
    }

}

export default AccountApi;