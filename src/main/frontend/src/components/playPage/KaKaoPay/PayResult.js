import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReserveApi from "../../../api/ReserveApi";
import Header from "../../Header";
import Footer from "../../Footer";
import styled from "styled-components";
import { Button } from "../../../utils/GlobalStyle";
const PayInfo = styled.div`
    width: 100%;
    height: 76vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    div{
      background-color: #eee;
      border-radius: 15px;
      width: 50%;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      @media (max-width:768px) {
          width: 80%;
          height: 50%;
      }
    }
    button{
      margin-top: 10%;
      border: none;
      font-size: 1em;
      width: 30%;
      border-radius: 15px;
      height: 10%;
      cursor: pointer;
      @media (max-width:768px) {
        height: 15%;
        width: 30%;
      }
    }

`
const PayResult = () => {
    // 초기값 세팅 그리고 위에서 결제한 결제 고유번호를 세팅 이건 백에다 넘길 정보 카카오랑 어쩌다보니 따로 구분됨
    const [payment, setPayment] = useState({
      // 가격
      price : 0,
      // 총 가격
      total : 0,
      // 수량
      quantity : 0,
      // 카카오 비과세 취소할 때 필요해서 결제할 때 백에다 정보를 넘겨주고 취소할 때 필요하면 다시 받아서 취소
      kakaoTaxFreeAmount : 0,
      // 위에서 받아옴
      tid : window.localStorage.getItem('tid'),
      // 결제 타입
      method : ''
    });
    // 위에 결제승인 token을 받기 위해
    let search = window.location.search;  
    // 키키오페이 결제 승인 요청에 보낼 정보
    const data = {
      params: {
        // 가맹점 번호
        cid: "TC0ONETIME",
        // 결제 고유번호
        tid : payment.tid,
        partner_order_id: "partner_order_id",
        // 가맹점 회원 id
        partner_user_id: "partner_user_id",
        // 결제승인 요청을 인정하는 토큰
        pg_token: search.split("=")[1],
      }
    };
    
    // 카카오페이에 결제 승인을 요청하는 실질적인 로직
    useEffect(() => {
      // data 안에 params를 가져옴
        const { params } = data;
        axios({
            url: "https://kapi.kakao.com/v1/payment/approve",
            method: "POST",
            headers: {
                Authorization: `KakaoAK a4ff9779bc55331da1b4b556b7a8a942`,
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        }).then(response => {
          // 응답을 받으면 위에 백에다 보낼 정보를 세팅해줌
            setPayment((state) => ({
              ...state,
              // 티켓 기본 가격 정보를 따로 안넘겨줘서 총 가격 / 수량
              price : response.data.amount.total / response.data.quantity,
              // 총 가격
              total : response.data.amount.total,
              // 수량
              quantity : response.data.quantity,
              // 결제 고유번호
              tid : response.data.tid,
              // 카카오 비과세
              kakaoTaxFreeAmount : response.data.amount.tax_free,
              // CARD OR MONEY 둘 중 하나의 방식이면 백에서 받을 때 KAKAOPAY라고 알려주기 위하여 KAKAOPAY로 변환해서 넘겨줌 둘 다 아니면 에러
              method : response.data.payment_method_type === 'CARD' || response.data.payment_method_type === 'MONEY' ? 'KAKAOPAY' : 'ERROR'
            }));
            // 그리고 url은 지워줌 왜냐하면 잘못되면 나중에 전에 url로 다시 이 결제로 돌아올 수 있기 때문이다.
            window.localStorage.removeItem('url');
        }).catch(error => {
            // 실패하면 결제 고유번호를 지워줌 똑같은 중복 결제 방지 위랑 비슷하다.
            window.localStorage.removeItem('tid');
            console.log(error);
        });
    }, []);

    const seatInfo = localStorage.getItem("totalSeat");// 선택한 좌석 정보
    const timeInfo = localStorage.getItem("timeInfo");
    const dateInfo = localStorage.getItem("dateInfo");
    const userId = localStorage.getItem("userId");
    const playId = localStorage.getItem("playId");
    const seatRating = localStorage.getItem("seatRating"); // 좌석 등급
    console.log(seatInfo,timeInfo,dateInfo,userId,playId,seatRating);
    const navigate = useNavigate();
    
    const addRes =async() =>{
      const rsp = await ReserveApi.addReserve(userId,playId,dateInfo,timeInfo,seatInfo);
      if(rsp.status === 200) {
        console.log("성공");
      } else {
          console.log("전송 실패");
      }
    }

    const onClick =() =>{
      addRes();
      navigate("/");
    }

        return(
          <>
          <Header/>
            <PayInfo>
              <div>
                <h1>결제가 정상 진행 되었습니다.</h1>
                <Button onClick={()=>onClick()}>결제 완료</Button>
              </div>
            </PayInfo>
          <Footer/>
          </>
        );
  };
export default PayResult