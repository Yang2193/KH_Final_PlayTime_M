import React, { useEffect, useState } from "react";
import AccountApi from "../../api/AccountApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import barcode from "../../images/barcode.gif";

const Container = styled.div`
    height : 100vh;
    display : flex;
    position: relative;
    justify-content: center;
    padding: 10px;
`

const InfoBox = styled.div`
    width : 40%;
    top : 0%;
    height : 740px;
    border: 3px solid #990A2C;
    position: relative;
    display : flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
    }

`

const BarCode = styled.div`
    position: relative;
    width : 240px;
    top : 10%;
    margin-bottom: 10px;
`
const BarCodeImg = styled.img`
    width : 100%;
`

const Ticket = () =>{
    const {reserveId} = useParams();
    const[ticketData, setTicketData] = useState(null);
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const rsp = await AccountApi.ticketDetail(reserveId);
                if(rsp.status === 200){
                    setTicketData(rsp.data);
                    console.log(rsp.data);
            }} catch(error){
                console.error(error);
            }
        }
        fetchData();
    }, [])




    return(

          <>
            {ticketData ?
            <Container>
                <InfoBox>
                    <p>티켓 정보</p>
                    <p>{ticketData.playTitle}</p>
                    <p>{ticketData.seeDate}</p>
                    <p>{ticketData.reserveTime}</p>
                    <p>{ticketData.seatInfo}</p>
                    <p>극장에 QR코드를 제시해주세요<div className=""></div></p>
                    <BarCode>
                        <BarCodeImg src={barcode} alt="barcode"/>
                    </BarCode>
                </InfoBox>

            </Container>
            :
            <Container>
                <InfoBox>
                    <p>해당 티켓 정보가 없습니다.</p>
                </InfoBox>
            </Container>

           }
           </>


    )
}

export default Ticket;