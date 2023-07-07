import axios from "axios";
import Functions from "../utils/Functions";
const KH_DOMAIN = "http://localhost:8111/"

// 인증이 필요한 요청의 경우, 이런 식으로 try catch 구문으로 요청을 넣어주세요.

const ExampleApi = {
    getAllExamples: async () => {
        try {
          Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
          return await axios.get(KH_DOMAIN + "/example"); // 요청 리턴
    
        } catch(error){
            await Functions.handleApiError(error);  // api 에러 401을 받으면 로컬에 저장된 리프레쉬 토큰을 보내 액세스 토큰을 재발급 받는 axios 요청을 보내는 함수(await 필수)
            return await axios.get(KH_DOMAIN + "/example"); // 요청 재실행
        }
      },
      
    postAllExamples: async(ex1, ex2, ex3) => {
      const example = {
        example1 : ex1,
        example2 : ex2,
        example3 : ex3
      };
      
      try{
        Functions.setAuthorizationHeader();
        return await axios.post(KH_DOMAIN + "/postExample", example);
      } catch(error){
          await Functions.handleApiError(error);
          return await axios.post(KH_DOMAIN + "/postExample", example);
      }
    }

}