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
    try {
    Functions.setAuthorizationHeader();
    return await axios.post(`/comments/${commentId}`, updatedComment);
  } catch(error){
    await Functions.handleApiError(error);  // api 에러 401을 받으면 로컬에 저장된 리프레쉬 토큰을 보내 액세스 토큰을 재발급 받는 axios 요청을 보내는 함수(await 필수)
    return await axios.get(`/comments/${commentId}`, updatedComment); // 요청 재실행
}
},


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
        // 한줄평 등록
        addOLR : async(cont,rating,userId,playId)=>{
          const data = {
              olrContent:cont,
              olrRating:rating,
              playId : playId,
              userId : userId
          }
          try{
              Functions.setAuthorizationHeader();
              return await axios.post(`/post/insert/oneLineReview`,data)
          }catch(error){
              await Functions.handleApiError(error);
              return await axios.post(`/post/insert/oneLineReview`,data)
          }
      },
        // 한줄평 조회
        getOLR : async(id)=>{
          try{
              Functions.setAuthorizationHeader();
              return await axios.get(`/post/select/oneLineReview?playId=${id}`)

          }catch(error){
              await Functions.handleApiError(error);
              return await axios.get(`/post/select/oneLineReview?playId=${id}`)
          }
      },
        // 한줄평 삭제
        deleteOLR : async(id)=>{
          try{
              Functions.setAuthorizationHeader();
              return await axios.post(`/post/delete/oneLineReview?olrId=${id}`)

          }catch(error){
              await Functions.handleApiError(error);
              return await axios.post(`/post/delete/oneLineReview?olrId=${id}`)
          }
      },
      // 한줄평 수정
          updateOLR : async(id,cont,rat)=>{
            const data = {
              olrId : id,
              olrContent : cont,
              olrRating : rat
            }
            try{
                Functions.setAuthorizationHeader();
                return await axios.post(`/post/update/oneLineReview`,data)

            }catch(error){
                await Functions.handleApiError(error);
                return await axios.post(`/post/update/oneLineReview`,data)
            }
        },

};



export default PostAPI;
