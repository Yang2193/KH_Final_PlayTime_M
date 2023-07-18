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
      width: 20%;
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
    const seatInfo = localStorage.getItem("totalSeat");// 선택한 좌석 정보
    const timeInfo = localStorage.getItem("timeInfo");
    const dateInfo = localStorage.getItem("dateInfo");
    const userId = localStorage.getItem("userId");
    const playId = localStorage.getItem("playId");

    let search = window.location.search;
    // 키키오페이 결제 승인 요청에 보낼 정보
    const data = {
      params: {
        // 가맹점 번호
        cid: "TC0ONETIME",
        // 결제 고유번호
        tid : window.localStorage.getItem('tid'),
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
        }).then( () => {
          const addRes =async() =>{
            const rsp = await ReserveApi.addReserve(userId,playId,dateInfo,timeInfo,seatInfo);
            if(rsp.status === 200) {
              console.log("성공");
            } else {
                console.log("전송 실패");
            }
          }
          addRes();
            // 그리고 url은 지워줌 왜냐하면 잘못되면 나중에 전에 url로 다시 이 결제로 돌아올 수 있기 때문이다.
            window.localStorage.removeItem('url');
        }).catch(error => {
            // 실패하면 결제 고유번호를 지워줌 똑같은 중복 결제 방지 위랑 비슷하다.
            window.localStorage.removeItem('tid');
            console.log(error);
        });
    }, []);

    const navigate = useNavigate();

    const onClick =() =>{
      navigate("/");
    }

        return(
          <>
          <Header/>
            <PayInfo>
              <div>
                <h1>결제가 정상 진행 되었습니다.</h1>
                <Button onClick={()=>onClick()}>메인 페이지로 돌아가기</Button>
              </div>
            </PayInfo>
          <Footer/>
          </>
        );
  };
export default PayResult