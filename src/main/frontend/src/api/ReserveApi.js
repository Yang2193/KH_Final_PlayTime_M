import axios from "axios";
import Functions from "../utils/Functions";

const KH_DOMAIN = "http://localhost:8111";

const ReserveApi = {
    //예매 추가
    addReserve : async(userId,playId,seeDate,reserveTime,seatInfo) =>{
        const info = {
            userId: userId,
            playId: playId,
            seeDate: seeDate,
            reserveTime : reserveTime,
            seatInfo : seatInfo,
        }
        try{
            Functions.setAuthorizationHeader();
            return await axios.post(`/play/addReserve`,info)

        }catch(error){
            await Functions.handleApiError(error);
            return await axios.post(`/play/addReserve`,info)
        }
    },
    //회원의 예매조회 entity로 조회 (예매 테이블에서 모든 컬럼 + 연극아이디와 회원아이디만나오는게 아니라 연극정보 테이블 값 전부와 회원정보 테이블값 전부가 다담겨서 나옴)
    selectResDto : async(userId)=>{
        try{
            Functions.setAuthorizationHeader();
            return await axios.get(`/play/resList?id=${userId}`)

        }catch(error){
            await Functions.handleApiError(error);
            return await axios.get(`/play/resList?id=${userId}`)
        }
    },
    // 공연장 좌석 정보 조회
    selectSeat : async(theaterId)=>{
        try{
            Functions.setAuthorizationHeader();
            return await axios.get(`/play/selSeat?id=${theaterId}`)

        }catch(error){
            await Functions.handleApiError(error);
            return await axios.get(`/play/selSeat?id=${theaterId}`)
        }
    },
    // 예매 조회로 해당 공연 좌석 유무 조회
    findSeat: async(playId)=>{
        try{
            Functions.setAuthorizationHeader();
            return await axios.get(`/play/reserveSeat?id=${playId}`)

        }catch(error){
            await Functions.handleApiError(error);
            return await axios.get(`/play/reserveSeat?id=${playId}`)
        }
    }
}



export default ReserveApi;