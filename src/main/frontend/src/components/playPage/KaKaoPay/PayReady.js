import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../../Header";
import Footer from "../../Footer";

const PayInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    @media (max-width:2560px) {
        height: 1080px;
        }
    @media (max-width:1920px) {
        height: 720px;
        }
    div{
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0 1%;
        background-color: #eee;
        border-radius: 15px;
        margin-bottom: 5%;
        width: 412px;
        @media (max-width:2560px) {
            height: 50%;
        }
        @media (max-width:1920px) {
            height: 100%;
        }
        @media (max-width:768px) {
            width: 50%;
            height: 60%;
            padding-left: 2%;
            margin-bottom: 10%;
        }
        @media (max-width:412px) {
            width: 90%;
            height: 60%;
        }
        p{
            margin: 0;
            margin-bottom: 10px;
            font-size: 1.3em;
            text-align: center;

            @media (max-width:768px) {
                font-size: 1em;
            }
        }
        .info{
            padding: 0 2%;
            width: 100%;
            font-size: 1.1em;
            color: #990A2C;
        }

    }
    a{
        text-decoration: none;
        color:#fff;
        border: 1px solid;
        background-color: #990A2C;
        width: 200px;
        height: 80px;
        font-size: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        @media (max-width:768px) {
                height: 50px;
            }
    }
`

const PayReady = () => {
    const title = localStorage.getItem("titleInfo") // 공연 제목
    const priceInfo = localStorage.getItem("selPrice"); // 선택한 가격정보
    const seatInfo = localStorage.getItem("totalSeat");// 선택한 좌석 정보
    const timeInfo = localStorage.getItem("timeInfo");// 시간 정보
    const tiketCount = localStorage.getItem("tiketCount")
    const dateInfo = localStorage.getItem("dateInfo");// 날짜 정보
// 카카오페이
    let [data, setData] = useState({
        next_redirect_pc_url: "",
        tid: "",
            // 가맹점 코드
            cid: "TC0ONETIME",
            // 가맹점 주문번호
            partner_order_id: "partner_order_id",
            // 가맹점 회원 id
            partner_user_id: "partner_user_id",
            // 상품 이름
            item_name: title,
            // 상품 수량
            quantity: 1,
            // 총 가격
            total_amount: priceInfo,
            // 상품 비과세
            tax_free_amount: 0,
            // 결제 성공 URL
            approval_url: "http://ticket-playtime.xyz/payResult",
            // 결제 실패 URL
            fail_url: "http://ticket-playtime.xyz/info",
            // 결제 취소 URL
            cancel_url: "http://ticket-playtime.xyz/info"
    });

    useEffect(() => {
        axios({
            url: "https://kapi.kakao.com/v1/payment/ready",
            method: "POST",
            headers: {
                Authorization: `KakaoAK a4ff9779bc55331da1b4b556b7a8a942`,// api키
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
                data: new URLSearchParams(data).toString(),
        })
        .then(response => {
        const {
            data: { next_redirect_pc_url, tid },
        } = response;
        // 결제 고유번호 tid를 저장
        window.localStorage.setItem("tid", tid);
        window.localStorage.setItem('url', next_redirect_pc_url);
        setData({ next_redirect_pc_url, tid });
        }).catch(error => {
        console.log(error);
        });
    }, []);

  const payUrl = window.localStorage.getItem('url');
    return (
        <>
        <Header children={<h1 style={{color:"white"}}>예매하기</h1>}/>
        <PayInfo>
            <h1> 결제 정보 </h1>
            <div>
                <p>상품 정보</p>
                <p className="info">{title}</p>
                <p>날짜 정보</p>
                <p className="info">{dateInfo}</p>
                <p>시간 정보</p>
                <p className="info">{timeInfo}</p>
                <p>좌석 정보</p>
                <p className="info">{seatInfo}</p>
                <p>수량</p>
                <p className="info">{tiketCount}매 </p>
                <p>가격 정보</p>
                <p className="info">{priceInfo}원</p>
            </div>
            <a href={payUrl}>결제하기</a>
        </PayInfo>
        <Footer/>
        </>

    );
}
export default PayReady;