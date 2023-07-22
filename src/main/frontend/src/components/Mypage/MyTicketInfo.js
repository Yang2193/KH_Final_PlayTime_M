import React, { useState, useEffect } from "react";
import AccountApi from "../../api/AccountApi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ListBox = styled.div`
    position: relative;
    top: 10%;
    margin: 0 auto;
    width: 70%;
    @media (max-width: 768px) {
        width: 80%;
        font-size: 80%;

        td .img-thumb{
            width: 60px;
            height: 80px;
        }
    }

    .bar{
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    table{
        width : 100%;
    }

    thead, tbody{
        width : 100%
    }
    
    thead th{
        background-color: #990A2C;
        color: #fff;
    }
    
    tbody td{
        border-bottom: 1px dotted #999;
    }

    td{
        height: 100px;
        text-align: center;
        font-size: 1rem;
        padding: 10px 0;

        @media (max-width: 768px) {
        font-size: 0.8rem;
        }
    }

    .img-thumb{
            width: 90px;
            height: 120px;
            margin: 0 auto;
            border: 1px solid #b9b9b9;
            vertical-align: middle;
        }
                    
    .menu p{
        margin: 0 20px;
    }
`

const MyTicketInfo = () => {
    const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
    const [buyList, setBuyList] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const buyTicketlist = async() => {
            try{
                const buyTicketData = await AccountApi.buyTicketList(userInfo.userId);
                console.log(buyTicketData);
                if(buyTicketData.status === 200) {
                    setBuyList(buyTicketData.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        buyTicketlist();
    }, [])
    // 구매한 티켓 내역 확인

    const movePage =(playId)=>{
        localStorage.setItem("playId",playId);
        nav("/info");
    }

    return (
            <>
            <Header/>
            <h3>{userInfo.userNickname}님의 구매내역</h3>
            <ListBox>
            <table className="buyListTable">
              <thead>
              </thead>
              <tbody>
                {buyList.map((bl) => (
                  <tr className="buyItem" key={bl.id}>
                    <td className="image"><img src={bl.playInfo.imageUrl} alt="image1" className="img-thumb"/></td>
                    <td className="title">{bl.playInfo.title}</td>
                    <td className="location">{bl.playInfo.theaterName}</td>
                    <td className="reserveDate">{bl.reserveDate}</td>
                    <td className="time">{bl.time}</td>
                    <td className="seeDate">{bl.seeDate}</td>
                    <td className="seatInfo">{bl.seatInfo}</td>
                    <td className="ticket">
                        <Link to={`/ticket/${bl.id}`}>티켓 확인</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </ListBox>
            <Footer/>
            </>
        );
}

export default MyTicketInfo;