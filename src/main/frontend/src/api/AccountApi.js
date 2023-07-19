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
        return await axios.post(Domain + "/auth/login", auth);
    },

    // 회원조회
    getUserInfo : async(userId) => {
        Functions.setAuthorizationHeader();
        const infoData = {
            userId: userId
        };
        return await axios.post(Domain + "/member/userinfo", infoData);
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
        return await axios.post(Domain + "/auth/signup", memberInfo);
    },

    // 회원탈퇴
    memeberDel : async(userId) => {
        const memberDelCmd = {
            userId: userId
        };
        return await axios.post(Domain + "/auth/userdelete", memberDelCmd);
    },

    // 아이디 / 패스워드 찾기
    findMemberId : async(userName, userEmail) => {
        const findId = {
            userName: userName,
            userEmail: userEmail
        };
        return await axios.post(Domain + "/auth/find/id", findId);
    },

    findMemberPw: async (userId, userName, email) => {
        const findPw = {
            userId: userId,
            userName: userName,
            userEmail: email
        };
        return await axios.post(Domain + "/auth/find/pw", findPw);
    },

    // 회원가입 시 이메일 인증
    sendAuthEmail: async(userEmail) => {
        const sendAuthEmailcmd = {
            userEmail: userEmail
        };
        return await axios.post(Domain + "/auth/sendAuthEmail", sendAuthEmailcmd);
    },

    // 마이페이지 회원 별 리뷰 가져오기
    getMemberReview : async(userId) => {
        Functions.setAuthorizationHeader();
        const getReview = {
            userId: userId
        };
        return await axios.post(Domain + "/mypage/post", getReview);
    },

    // 마이페이지 댓글 가져오기

    getMemberComment: async(userId) => {
        Functions.setAuthorizationHeader();
        const getMemberCommentcmd = {
            userId: userId
        };
        return await axios.post(Domain + "/mypage/comment", getMemberCommentcmd);
    },

    checkMemberPw: async(userId, userPw) => {
        Functions.setAuthorizationHeader();
        const checkMemberPwcmd = {
            userId: userId,
            userPw: userPw
        };
        return await axios.post(Domain + "/mypage/checkmemberPw", checkMemberPwcmd);
    },

    updateUserInfo: async(userId, userPw, userNickname, userName, userPhone, userEmail) => {
        Functions.setAuthorizationHeader();
        const updateUserInfocmd = {
            userId: userId,
            userPw: userPw,
            userNickname: userNickname,
            userName: userName,
            userPhone: userPhone,
            userEmail: userEmail
        };
        return await axios.post(Domain + "/mypage/edit", updateUserInfocmd);
    },

    updateUserInfo2: async(userId, userNickname) => {
        Functions.setAuthorizationHeader();
        const updateUserInfo2cmd = {
            userId: userId,
            userNickname: userNickname
        };
        return await axios.post(Domain + "/mypage/edit2", updateUserInfo2cmd);
    },

    buyTicketList: async(userId) => {
        Functions.setAuthorizationHeader();
        const buyListcmd = {
            userId: userId
        };
        return await axios.post(Domain + "/mypage/buylist", buyListcmd);
    },

    withdraw: async(userId) => {
        Functions.setAuthorizationHeader();
        const withdrawcmd = {
            userId: userId
        };
        return await axios.post(Domain + "/mypage/withdraw", withdrawcmd);
    },

    ticketDetail: async(reserveId) =>{
        try{
            Functions.setAuthorizationHeader();
            return await axios.get(Domain + `/mypage/ticket/${reserveId}`);
        } catch(error){
            await Functions.handleApiError(error);
            return await axios.get(Domain + `/mypage/ticket/${reserveId}`);
        }
    },

    kakaoAccessToken: async(code) => {
        const kakaoAccessTokencmd = {
            code: code
        }
        return await axios.post(Domain + `/auth/kakao/callback`, kakaoAccessTokencmd)
    },

}

export default AccountApi;