import React from "react";
import Calendar from "react-calendar";
import { useState,useEffect } from "react";
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../utils/GlobalStyle";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import ReserveApi from "../api/ReserveApi";
import MessageModal from "../utils/MessageModal";

const ReserveStyle = styled.div`
    width: 100%;
    @media (max-width:768px) {
        display: flex;
        align-items: center;
        flex-direction: column;
        }
    @media (max-width:412px) {
        max-width: 100%;
        height: 915px;
        }

    .conteiner{
        margin-top: 2%;
        width: 50%;
        height: 1000px;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        left: 25%;
        @media (max-width:2560px) {
            height: 1700px;
        }
        @media (max-width:1920px) {
            height: 1000px;
        }
        @media (max-width:768px) {
            margin: 0;
            width: 80%;
            left: 0;
            height: 700px;
        }
        @media (max-width:412px) {
            width: 90%;
        }
    }
    .seatInfo{
        @media (max-width:768px) {
            height: 100vh;
        }
        @media (max-width:412px) {
            height: 76vh;
        }
        @media (max-width:360px) {
            height: 100%;
        }

    }
    .reserved{
        background-color: #eee;
        color: #fff;
        cursor: not-allowed;
    }
    .stage{
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        h2{
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid;
            width: 30%;
            height: 50%;
        }
        @media (max-width:412px) {
                width:735px;
            }
    }
    .box{
        width: 100%;
        height: 60%;
        @media (max-width:768px) {
            width: 110%;
            height: 55%;
            margin-bottom: 10%;
            }
            @media (max-width:412px) {
                overflow: scroll;
                width: 100%;
                height: 500px;
            }
    }
    .seat{
        display: flex;
        width: 100%;
        height: 50%;
        flex-direction: column;
        @media (max-width:412px) {
            width: 700px;
            height: 320px;
        }
    }
    .seat-row{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 30%;
        margin-bottom: 1%;
        p{
            width: 4%;
        @media (max-width:768px) {
            width: 13%;
        }
        @media (max-width:412px) {
                width:5%;
                font-size: 1em;
            }
        }
        span{
            border: 1px solid;
            width: 4%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-left: 1%;
            @media (max-width:768px) {
                font-size: 0.8em;
                width: 10%;
                height: 40%;
            }
            @media (max-width:412px) {
                font-size: 1em;
                width: 30px;
                height: 30px;
            }

        }
        .empty{
            border: none;
            cursor: default;
        }
    .selected{
            background-color: #990a2c;
            color: #fff;
        }
    }
    .time{
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: column;
        h3{
            @media (max-width:2560px) {
                font-size: 2em;
        }
        @media (max-width:1920px) {
            font-size: 1em;
        }
            @media (max-width:412px) {
                font-size: 1em;
                width: 100%;
                height: 20%;
            }
        }
        .timeBox{
            width: 100%;
            height: 50%;
            display: flex;
            p{
            width: 15%;
            height: 70%;
            border: 1px solid;
            border-radius: 10px;
            margin-left: 2%;
            background-color: white;
            font-size: 1em;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            @media (max-width:2560px) {
            font-size: 2em;
        }
        @media (max-width:1920px) {
            font-size: 1em;
        }
            @media (max-width:768px) {
                width: 20%;
                font-size: 1em;
                height: 70%;
            }
            @media (max-width:412px) {
                margin-top: 0;
                width: 20%;
                font-size: 1em;
                height: 60%;
            }
        }
        .selected{
            background-color: #990a2c;
            color: #fff;
        }
        }
    }
    .cal{
        width: 100%;
        height:45%;
        @media (max-width:412px) {
            height: 40%;
        }
    }
    .btn{
        margin-top: 10%;
            width: 20%;
            height: 5%;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            @media (max-width:2560px) {
                font-size: 2em;
            }

            @media (max-width:1920px) {
                font-size: 1em;
            }
            @media (max-width:768px) {
                width: 50%;
                height: 6%;
            }
            @media (max-width:412px) {
                width: 50%;
            }
        }
    .priceInfo{
        width: 50%;
        padding-left: 2%;
        background-color: #eee;
        border-radius: 15px;
        @media (max-width:768px) {
            width: 80%;
        }
        @media (max-width:412px) {
            width: 100%;
    }
    }
    .react-calendar {
        width: 100%;
        height: 100%;
        max-height: 100%;
        max-width: 100%;
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        line-height: 1.125em;
    }
    .react-calendar__navigation button {
        color: #990A2C;
        background: none;
        margin-top: 8px;
        @media (max-width:2560px) {
            font-size: 2em;
            min-width: 50px;
            height: 50px;
        }
        @media (max-width:1920px) {
            min-width: 44px;
            font-size: 1.5em;
            font-weight:bold;
        }
        @media (max-width:768px) {
            font-size: 1em;
            min-width: 30px;
        }
        @media (max-width:412px) {
            height: 30px;
    }
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #eee;
    }
    .react-calendar__navigation button[disabled] {
        background-color: #eee;
    }
    abbr[title] {
        text-decoration: none;
    }
    .react-calendar__month-view__weekdays{
        @media (max-width:2560px) {
            margin-top: 30px;
            font-size: 1.5em;
            height: 50px;
        }
        @media (max-width:1920px) {
            margin-top: 0;
            font-size: 1em;
            height: 100%;
        }
        @media (max-width:412px) {
            font-size: 0.8em;
    }
    }
    .react-calendar__tile{
        background-color: #fff;
        @media (max-width:2560px) {
            font-size: 2em;
            height: 100px;
        }
        @media (max-width:1920px) {
            font-size: 1em;
            height: 50px;
        }
        @media (max-width:768px) {
            font-size: 0.8em;
            height: 30px;
            max-width: 100%;
        }
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background: #990A2C;
        color: #fff;
        border-radius: 5px;
    }
        .react-calendar__tile--now {
            background: white;
            border-radius: 6px;
            color: black;
        }
        .react-calendar__tile--active {
            background: #990A2C;
            border-radius: 5px;
            font-weight: bold;
            color: white;
        }
            .react-calendar__tile--active:enabled:hover,
            .react-calendar__tile--active:enabled:focus {
            background: #990A2C;
            color: white;
        }
`

const ReservePage = () =>{
    const timeInfo = localStorage.getItem("time") // 요일별 시간 정보 가져오기
    // 요일을 숫자로 반환
    function changeDay(day) {
        const dayOfWeek = {
          월요일: 1,
          화요일: 2,
          수요일: 3,
          목요일: 4,
          금요일: 5,
          토요일: 6,
          일요일: 0
        };
        return dayOfWeek[day];
    }
    // 날짜 선택시 해당 날짜에 맞는 요일에 연극 시간을 불러옴
    function getTimeOptions(timeInfo, selectedDate) {
        const dayOptions = timeInfo.split(', '); // 문자열 정보를 시간과 요일별로 나누고
        const date = new Date(selectedDate);
        const selectedDay = date.getDay();// 선택한 날짜의 요일을 숫자로 출력
        let timeOptions = null;
        dayOptions.forEach(dayOption => { // for문 돌리며 요일별 날짜 정보들 나누고
            const [dayRange, timeRange] = dayOption.split('(');
            const days = dayRange.split(' ~ ');
            const startDay = changeDay(days[0]); // 요일 문자열을 숫자로 변경 후 대입
            const endDay = changeDay(days.length > 1 ? days[1] : days[0]);
            const times = timeRange.replace(')', '').split(',');
            if (
                (selectedDay >= startDay && selectedDay <= endDay) || // 토요일부터 일요일까지
                (startDay > endDay && (selectedDay >= startDay || selectedDay <= endDay)) // 평일~평일
              ) {
                timeOptions = times;
              }
            });
        return timeOptions
    }

    const [value, setValue] = useState();// 선택한 공연 날짜 정보
    const [selTime,setSelTime] = useState(""); // 선택한 공연 시간 정보
    const [timeOptions, setTimeOptions] = useState([]);
    const theaterId = localStorage.getItem("theaterId")
    localStorage.setItem("dateInfo",moment(value).format("YYYY-MM-DD"));
    localStorage.setItem("timeInfo",selTime);

// 날짜 및 시간 선택
    const dateData = (date) =>{
        setValue(date);
        setTimeOptions(getTimeOptions(timeInfo, date));
    }
    const timeData = (time) => {
        setSelTime(time);
    }
// 좌석 정보
    const [seatInfo,setSeatInfo] = useState([]);// 좌석정보 불러오기
    const [selSeat,setSelSeat] = useState([]);// 선택한 좌석 번호
    const [seatDetails, setSeatDetails] = useState([]); // 선택한 좌석의 등급과 번호 저장
    useEffect(()=>{
        const seat = async()=>{
            const rsp = await ReserveApi.selectSeat(theaterId);
            setSeatInfo(rsp.data);
            if (rsp.status ===200) {
                console.log("성공");
            }
        };
        seat();
        },[])
    const clickSeat = (seat) => {
        if (selSeat.includes(seat)) {
            setSelSeat(selSeat.filter((selectedSeat) => selectedSeat !== seat));
          } else {
            setSelSeat([...selSeat, seat]);
          }
    };
    const groupedSeats = seatInfo.reduce((groups, seat) => {
        const row = seat.seatNumber.charAt(0); // 열 이름
        const seatColumn = seat.seatNumber.slice(1); // 번호
        if (!groups[row]) {
          groups[row] = [];
        }
        groups[row].push({ seatNumber: seatColumn });
        return groups;
      }, {});

// 예약된 좌석 조회
    const playId = localStorage.getItem("playId")
    const [findSeat,setFindSeat] = useState([]);
    console.log(findSeat);
    useEffect(()=>{
        const reservedSeat = async()=>{
            const rsp = await ReserveApi.findSeat(playId);// 연극 기준으로 예매목록을 조회하여 예매된 좌석 찾기
            setFindSeat(rsp.data);
            if (rsp.status ===200) {
                console.log("성공");
            }
        };
        reservedSeat();
        },[])

// 가격 정보 추출 및 전달
    const priceInfo = localStorage.getItem("price");
    const priceOptions = priceInfo.split(", ");

    if (priceInfo.includes("전석")) {
        const price = parseInt(priceInfo.split(" ")[1].replace(",", ""))
        const total= price * selSeat.length
        localStorage.setItem("selPrice",total)
        localStorage.setItem("tiketCount",selSeat.length)
    } else if(priceInfo.includes("R") && priceInfo.includes("S") && !priceInfo.includes("A")){
        let price = 0
        selSeat.forEach((seat)=>{
            const seatRow = parseInt(seat.charAt(0));
            if (seatRow >= 1 && seatRow <= 3) {
                price += parseInt(priceOptions[0].split(" ")[1].replace(",", ""));
            } else if (seatRow >= 4 && seatRow <= 6) {
                price += parseInt(priceOptions[1].split(" ")[1].replace(",", ""));
            }
        })
        const total = price
        localStorage.setItem("selPrice", total);
        localStorage.setItem("tiketCount", selSeat.length);
    }else if(priceInfo.includes("R") && priceInfo.includes("S") && priceInfo.includes("A")){
        let price = 0
        selSeat.forEach((seat)=>{
            const seatRow = parseInt(seat.charAt(0));
            if (seatRow >= 1 && seatRow <= 2) {
                price += parseInt(priceOptions[0].split(" ")[1].replace(",", ""));
            } else if (seatRow >= 3 && seatRow <= 4) {
                price += parseInt(priceOptions[1].split(" ")[1].replace(",", ""));
            }else if (seatRow >= 5 && seatRow <= 6) {
                price += parseInt(priceOptions[2].split(" ")[1].replace(",", ""));
            }
        })
        const total = price
        localStorage.setItem("selPrice", total);
        localStorage.setItem("tiketCount", selSeat.length);
    }
    // 좌석 등급 열 번호 전달
    useEffect(() => {
        const updatedSeatDetails = selSeat.map(seat => {
          let seatInfo = '';
          if (priceInfo.includes('전석')) {
            seatInfo = `${priceOptions[0].split(" ")[0]} ${seat.charAt(0)}열 ${seat.slice(1)}번`;
          } else if (priceInfo.includes('R') && priceInfo.includes('S') && !priceInfo.includes('A')) {
            const seatRow = parseInt(seat.charAt(0));
            if (seatRow >= 1 && seatRow <= 3) {
              seatInfo = `${priceOptions[0].split(" ")[0]} ${seatRow}열 ${seat.slice(1)}번`;
            } else if (seatRow >= 4 && seatRow <= 6) {
              seatInfo = `${priceOptions[1].split(" ")[0]} ${seatRow}열 ${seat.slice(1)}번`;
            }
          } else if (priceInfo.includes('R') && priceInfo.includes('S') && priceInfo.includes('A')) {
            const seatRow = parseInt(seat.charAt(0));
            if (seatRow >= 1 && seatRow <= 2) {
              seatInfo = `${priceOptions[0].split(" ")[0]} ${seatRow}열 ${seat.slice(1)}번`;
            } else if (seatRow >= 3 && seatRow <= 4) {
              seatInfo = `${priceOptions[1].split(" ")[0]} ${seatRow}열 ${seat.slice(1)}번`;
            } else if (seatRow >= 5 && seatRow <= 6) {
              seatInfo = `${priceOptions[2].split(" ")[0]} ${seatRow}열 ${seat.slice(1)}번`;
            }
          }
          return seatInfo;
        });

        setSeatDetails(updatedSeatDetails);
      }, [selSeat]);
    localStorage.setItem("totalSeat",seatDetails)


// 요일이 변경되면 선택된 시간 초기화
    useEffect(() => {
        setSelTime("");
    }, [value]);
    const [seatMo,setSeatMo] = useState(false);
    const nav = useNavigate();
    const payReady=()=>{
        console.log(seatDetails);

        if (seatDetails.length===0) {
            setSeatMo(true)
            return
        }else{nav("/payReady")}
    }
// 타입설정
const[modal,setModal] =useState(false);
    const[type,setType] = useState("default");
    const nextPage =() =>{
        if (selTime==="") {
            setModal(true)
            return
        } else {setType("seat");}
    }
    const onClickClose = () => {
        setModal(false);
        setSeatMo(false);
        }

    return(
        <ReserveStyle>
        <Header children={<h1 style={{color:"white"}}>예매하기</h1>}/>
        {type === "default" && (
            <div className="conteiner">
                <h1>날짜 및 시간 선택</h1>
                <div className="cal">
                    <Calendar
                    onChange={dateData}
                    value={value}
                    calendarType="US"
                    minDate={new(Date)}
                    />
                </div>
                    {timeOptions === null ?
                    <div className="time">
                        <h3>회차가 존재하지 않습니다.</h3>
                    </div>
                    :
                    <div className="time">
                        <h3>회차 선택</h3>
                        <div className="timeBox">
                        {timeOptions.map((time, index) => (
                            <p
                            className={selTime === time ? "selected" : ""}
                            onClick={()=>timeData(time)}
                            key={index}
                            >
                                {time.trim()}
                            </p>
                        ))}
                        </div>
                    </div>
                    }
                    <Button className="btn" onClick={()=>nextPage()}>좌석 선택</Button>
            </div>
        )}
        {type === "seat" &&(
        <div className="conteiner seatInfo">
        {/* <h1>좌석 선택</h1> */}
        <div className="box">
            <div className="stage">
                <h2>STAGE</h2>
            </div>
            <div className="seat">
                {Object.entries(groupedSeats).map(([row, seats]) => (
                <div className="seat-row">
                    <p>{row}열</p>
                    {seats.map((seat) => {
                        const seatNumber = seat.seatNumber.toString();
                        const isSeatTaken = findSeat.some( s =>
                            (s.seatInfo.includes(`${row}열 ${seatNumber}번`) ||
                            (seatNumber.includes("C") && s.seatInfo.includes(`${row}열 ${seatNumber.replace("C", "")}번`))) &&
                            s.seeDate === moment(value).format("YYYY-MM-DD") &&
                            s.time === selTime
                        );
                        if (isSeatTaken) {
                            if (seatNumber.includes("C")) {
                                return(
                                    <>
                                        <span className="reserved">{seatNumber.replace("C", "")}</span>
                                        <span className="empty"> </span>
                                    </>
                                )
                            }else{
                                return (
                                    <span className="reserved">{seatNumber.replace("C", "")}</span>
                                );
                            }
                        } else {
                            if (seatNumber.includes("C")) {
                                const seatNumberWithoutC = seatNumber.replace("C", "");
                            return (
                                <>
                                    <span
                                        className={selSeat.includes(row + seatNumberWithoutC) ? "selected" : ""}
                                        onClick={() => clickSeat(row + seatNumberWithoutC)}>
                                        {seatNumberWithoutC}
                                    </span>
                                    <span className="empty"> </span>
                                </>
                            );
                            } else {
                            return (
                                <span
                                className={selSeat.includes(row + seatNumber) ? "selected" : ""}
                                onClick={() => clickSeat(row + seatNumber)}>
                                    {seatNumber}
                                </span>
                            );
                        }
                    }
                })}
                </div>
            ))}
            </div>
        </div>
        <div className="priceInfo">
            {priceInfo.includes("전석")&&( <p>{priceInfo}</p>)}
            {priceInfo.includes("R") && priceInfo.includes("S") && !priceInfo.includes("A") && (
                <>
                    <p>1 ~ 3열 R석</p>
                    <p>4 ~ 6열 S석</p>
                    <p>{priceInfo}</p>
                </>
            )}
            {priceInfo.includes("R") && priceInfo.includes("S") && priceInfo.includes("A") && (
                <>
                    <p>1 ~ 2열 R석</p>
                    <p>3 ~ 4열 S석</p>
                    <p>5 ~ 6열 A석</p>
                    <p>{priceInfo}</p>
                </>
            )}
        </div>
        <Button className="btn" onClick={() => payReady()}>결제 정보 확인</Button>
        </div>
        )}
       <Footer/>
       <MessageModal open={modal} close={onClickClose} header="회차 확인">회차를 선택해 주세요.</MessageModal>
       <MessageModal open={seatMo} close={onClickClose} header="좌석 확인">좌석을 선택해 주세요.</MessageModal>

        </ReserveStyle>
        )
}

export default ReservePage;