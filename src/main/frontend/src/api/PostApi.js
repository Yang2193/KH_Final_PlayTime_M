import axios from "axios";
import Functions from "../utils/Functions";
import Post from './../pages/PostPage';

const Posts = "http://localhost:8111"; // 백엔드 API 서버 주소

const PostAPI = {
  // 게시물 목록 조회
  getAllPosts: async () => {
    Functions.setAuthorizationHeader();
    return await axios.get(`/post/select`);
  },

  // 게시물 상세 정보 조회
  getPostById: async (postId) => {
    Functions.setAuthorizationHeader();
    const response = await axios.get(`/post/select/${postId}`);
    return response.data;
  },

   // 게시물 등록
   addPost: async (postTitle, postContent, postImageUrl, postCategory, userId) => {
    try {
      Functions.setAuthorizationHeader();
      const postData = {
        postTitle: postTitle,
        postContent: postContent,
        postImageUrl: postImageUrl,
        postCategory: postCategory,
        userId: userId,
      };

      Functions.setAuthorizationHeader();

      const response = await axios.post(`/post/postUpload`, postData);
      return response.data;
    } catch (error) {
      await Functions.handleApiError(error);
      const response1 = await axios.post(`/post/postUpload`);
      return response1.data;
    }
  },
    // 게시물 삭제
    deletePost: async (postId) => {
      return await axios.post(`/post/delete/${postId}`);
    },

  // 조회수 증가
  increasePostViews: async (postId) => {
    const response = await axios.post(`/post/${postId}/increase-views`);
    return response.data;
  },




  // 게시물 ID로 댓글 리스트 조회
  getCommentsByPostId: async (postId) => {
    const response = await axios.get(`/comments/detail/${postId}`);
    return response.data;
  },

    // 댓글 생성
  createComment: async (newComment) => {
    Functions.setAuthorizationHeader();
    console.log(newComment);
    return await axios.post(`/comments/createComment`, newComment);
  },

  // 댓글 삭제
  deleteComment: async (commentId) => {

    return await axios.post(`/comments/delete/${commentId}`);

  },

  // 댓글 수정
  updateComment: async (commentId, updatedComment) => {
    return await axios.post(`/comments/${commentId}`, updatedComment);
  },
//ㅅㅈ
// 댓글 신고
reportComment: async (commentId, reportReason, nickname, postId,userId) => {
  const reportData = {
    commentId: commentId,
    reportContent: reportReason,
    nickname: nickname,
    postId: postId,
    reportUserId: userId
  };
  console.log(reportData);

  return await axios.post(`/reports/report`, reportData);

},

  // 카테고리에 해당하는 게시물 목록 조회
   getPostsByCategory: async (categoryId) => {
    return await axios.get(`/post/category/${categoryId}`);
  },
    // 게시물 수정
    updatePost: async (postId, updatedPost) => {
      try {
        Functions.setAuthorizationHeader();
        const response = await axios.post(`/post/update/${postId}`, updatedPost);
        return response.data;
      } catch (error) {
        await Functions.handleApiError(error);
        const response1 = await axios.post(`/post/update/${postId}`);
        return response1.data;
      }

    },
    // 게시물 검색
    searchPosts: async (keyword) => {
      const config = {
        params: {
          keyword: keyword,
        },
      };
      try {
        const response = await axios.post(`/post/search`, null, config);
        return response.data;
      } catch (error) {
        await Functions.handleApiError(error);
        return null;
      }
    },
    
};



export default PostAPI;
