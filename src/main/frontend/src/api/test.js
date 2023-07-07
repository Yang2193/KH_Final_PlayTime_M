// import axios from "axios";
// import Functions from "../utils/Functions";

// const Posts = "http://localhost:8111"; // 백엔드 API 서버 주소

// const PostAPI = {
//   // 게시물 목록 조회
//   getAllPosts: async () => {
//     Functions.setAuthorizationHeader();
//     return await axios.get(`${Posts}/post/select`);
//   },

//   // 게시물 상세 정보 조회
//   getPostById: async (postId) => {
//     const response = await axios.get(`${Posts}/post/select/${postId}`);
//     return response.data;
//   },

//   // 게시물 등록
//   addPost: async (postTitle, postContent, postImageUrl, postCategory, userId) => {
//     const postData = {
//       postTitle: postTitle,
//       postContent: postContent,
//       postImageUrl: postImageUrl,
//       postCategory: postCategory,
//       userId: userId,
//     };

//     const response = await axios.post(`${Posts}/post/postUpload`, postData);
//     return response.data;
//   },

//   // 조회수 증가
//   increasePostViews: async (postId) => {
//     const response = await axios.post(`${Posts}/post/${postId}/increase-views`);
//     return response.data;
//   },

//   // 댓글 생성
//   createComment: async (postId, newComment) => {
//     const response = await axios.post(`${Posts}/comments/${postId}`, newComment, {
     
//     });
//     return response.data;
//   },
// };

// export default PostAPI;



// const PostAPI = {
//     // 게시물 목록 조회
//     getAllPosts: async () => {
//       try {
//         console.log(Functions.getRefreshToken()); // 테스트 한다고 넣은 예시 입니다 지우세요 ㅋㅋ
//         Functions.setAuthorizationHeader(); // 예시로 넣어놨습니다. 나중에 지우세요.
//         return await axios.get(`${Posts}/post/select`);
  
//       } catch(error){
//         await Functions.handleApiError(error); // 테스트 한다고 넣은 예시 입니다 지우세요 ㅋㅋ
//         console.log("여기까지 실행 되는지 확인1"); // 테스트 한다고 넣은 예시 입니다 지우세요 ㅋㅋ
//         return await axios.get(`${Posts}/post/select`); // 테스트 한다고 넣은 예시 입니다 지우세요 ㅋㅋ
//       } 
//     },