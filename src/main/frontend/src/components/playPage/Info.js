import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../utils/GlobalStyle";
import PlayInfoApi from "../../api/PlayInfoApi";
import { useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import MessageModal from "../../utils/MessageModal";
import moment from "moment";
const All = styled.div`
@media (max-width:768px) {
        width: 100%;
        height: 1050px;
    }
    @media (max-width:412px) {
        height: 800px;
    }
    @media (max-width:360px) {
        height: 720px;
    }
`
const FixData = styled.div`
    width: 1140px;
    height: 750px;
    @media (max-width:768px) {
        width: 100%;
        height: 700px;
    }
    @media (max-width:1364px) {
        width:818px;
        height: 752px;
    }
    @media (max-width:412px) {
        height: 800px;
    }
    @media (max-width:360px) {
        height: 720px;
        width:360px;
    }
    h1{
        font-size: 1.5em;
        margin: 0;
        padding-bottom: 2%;
        margin-bottom: 4%;
        border-bottom: 3px solid;
    }
    .content{
        margin-top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1140px;
        height: 750px;
        @media (max-width:1364px) {
        width:818px;
        height: 752px;
    }
        @media (max-width:768px) {
            width:768px;
            height: 1000px;
            flex-direction: column;
    }
    @media (max-width:412px) {
            width:412px;
            height: 800px;
    }
    @media (max-width:360px) {
            width:360px;
            height: 720px;
    }
        img {
            margin-top: 80px;
            border-radius: 15px;
            width: 400px;
            height: 560px;
            margin-right:50px;
            @media (max-width:768px) {
                margin: 0;
                z-index: -1;
                border-radius: 0px;
                width: 100%;
                height: 600px;
            }
            @media (max-width:412px) {
                height: 375px;
        }
            @media (max-width:360px) {
                bottom: 360px;
                height: 320px;
        }
    }
        .textBox{
            width: 700px;
            height: 480px;
            @media (max-width:768px) {
                font-size: 0.9em;
                border-radius: 15px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                background-color: white;
                z-index: 0;
            }
            @media (max-width:360px) {
                font-size: 0.8em;
            }
        }
        .like{
            text-align: end;
            @media (max-width:768px) {
                margin-top:10px;
                width: 80%;
                height: 25px;
            }
            @media (max-width:412px) {
                height: 15px;
            }
        }
        .infoBox{
            position: relative;
            bottom: 40px;
            z-index: -1;
            width: 100%;
            height: 100%;
            font-size: 1em;
            @media (max-width:768px) {
                margin-top: 10px;
                width: 80%;
                height: 100%;
                font-size: 1em;
                bottom:40px;
            }
            @media (max-width:412px) {
                z-index: -2;
                margin-top: 20px;
                width: 90%;
                height: 90%;
            }
            ul{
                list-style: none;
                padding: 0;
                margin: 0;

            }
            li{
                display: flex;
                margin-bottom: 3%;
                span{
                    width: 30%;
                }
                div{
                    width: 100%;
                }
            }
        }
    }

    .btnBox{
        height:10%;
        width: 100%;
        display: flex;
        justify-content:center ;
        align-items:center;
        @media (max-width:768px) {
            width: 100%;
            height: 50px;
        }
        @media (max-width:412px) {
            position: absolute;
            height: 40px;
            bottom: 35px;
        }
        @media (max-width:360px) {
            height: 40px;
            bottom: -45px;
        }
        .resBtn{
            width: 100%;
            height: 100%;
            font-size: 1.2em;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            @media (max-width:768px) {
                border-radius: 0%;
                width: 100%;
            }
        }
        .resBtn:hover{
        background-color:#790A2C ;
       }
    }
    .endBtn{
        background-color:#e4e6e8;
        width: 100%;
        height: 100%;
        font-size: 1.2em;
        border: none;
        cursor: default;
        color: #a7acb6;
    }
`

const Info = () =>{
    const [modal,setModal] = useState(false);
    const [playInfo,setPlayInfo] = useState(null);
    const playId = localStorage.getItem("playId"); // 연극 아이디
    const userId = localStorage.getItem("userId"); // 유저 아이디
    const navigate = useNavigate();
    const onClickClose = () => {
        setModal(false);
        }
    // 연극정보 불러오기
    useEffect(()=>{
        const play = async()=>{
            const rsp = await PlayInfoApi.selectPlayInfo(playId);
            setPlayInfo(rsp.data);
        };
        play();
    },[])

// 찜기능
    const [isLiked, setIsLiked] = useState(false); // 최종 찜 상태
    const [likedList,setLikedList] = useState([]); // 찜 리스트 배열
    useEffect(()=>{ // 로그인한 회원id를 기준으로 찜 연극 리스트를 db에서 불러와 확인하고 배열에 삽입/
        const liked = async() => {
            const rsp = await PlayInfoApi.selectPlayLike(userId);
            setLikedList(rsp.data);
        }
        liked();
    },[userId]);

    useEffect(() => {
        if (likedList.some(item => item.playId === playId)) { // 배열을 확인하며 해당 연극 페이지에서 찜이 등록되어 있으면 true 아니면 false
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [likedList,playId]);

    const addLike = async () => {
        const rsp = await PlayInfoApi.addPlayLike(playId, userId);
        if (rsp.data !== null) {
            console.log("찜 등록 성공");
            setLikedList([...likedList, { playId, userId }]);
            setIsLiked(true);
            } else {
                console.log(" 등록 전송 실패");
            }
        };

    const deleteLike = async () => {
        const rsp = await PlayInfoApi.delPlayLike(playId, userId);
        if (rsp.data !== null) {
            console.log("찜 삭제 성공");
            setLikedList(likedList.filter(item => !(item.playId === playId && item.userId === userId))); // 찜 삭제 성공시 배열에도 삭제
            setIsLiked(false);
            } else {
            console.log("삭제 전송 실패");
            }
        };
    const onClickLiked = () => {
        if (userId===null) {
            setModal(true);
            return;
        }else{
            if (!isLiked) {
                addLike();
            } else {
                deleteLike();
            }
        }
    };
    const onClickLogin = () => {
        setModal(false);
        navigate("/login");
   }

    // 예매하기
    const reserve = (playPlan,price,title,theaterId)=> {
        if (userId===null) {
            setModal(true);
            return;
        } else {
            localStorage.setItem("time",playPlan)
            localStorage.setItem("price",price)
            localStorage.setItem("titleInfo",title)
            localStorage.setItem("theaterId",theaterId)
            navigate("/reserve")
        }
    }
    const date =new Date();
    const now =moment(date).format("YYYY-MM-DD");
    return(
        <All>
          {playInfo && playInfo.map(play =>(
            <FixData key = {play.playId}>
                    <div className="content">
                        <img src={play.playPoster} alt="" />
                        <div className="textBox">
                            {moment(play.periodEnd).isBefore(now) ?
                                <div className="like"><FaHeart style={{fontSize: '200%', color:"#eee"}}/></div>
                            :
                                <div className="like"><FaHeart onClick={()=>onClickLiked()} style={{fontSize: '200%', cursor:"pointer", color: isLiked ? "red" : "#999999" }}/></div>
                            }
                            <div className="infoBox">
                                <h1>{play.title}</h1>
                                <ul>
                                    <li>
                                        <span>장소</span>
                                        <div>
                                            {play.theaterName}
                                        </div>
                                    </li>
                                    <li>
                                        <span>공연기간</span>
                                        <div>
                                            {play.periodStart} ~ {play.periodEnd}
                                        </div>
                                    </li>
                                    <li>
                                        <span>공연시간</span>
                                        <div>
                                            {play.playTime}
                                        </div>
                                    </li>
                                    <li>
                                        <span>관람연령</span>
                                        <div>
                                            {play.playAge}
                                        </div>
                                    </li>
                                    <li>
                                        <span>가격</span>
                                        <div>
                                            {play.playPrice}
                                        </div>
                                    </li>
                                    <li>
                                        <span>공연 스케줄</span>
                                        <div>
                                            {play.playPlan}
                                        </div>
                                    </li>
                                    {play.playCast==="" ? null :
                                        <li>
                                            <span> 배우진 </span>
                                            <div>
                                                {play.playCast}
                                            </div>
                                        </li>
                                    }
                                </ul>
                            </div>
                            <div className="btnBox">
                                {moment(play.periodStart).isAfter(now) ?
                                    <button className="endBtn">판매 예정</button>
                                : (moment(play.periodEnd).isBefore(now) ?
                                    <button className="endBtn">판매 종료</button>
                                : <Button className="resBtn" onClick={() => reserve(play.playPlan, play.playPrice, play.title, play.theaterId)}>예매 하기</Button>
                                )}
                            </div>
                    </div>
                </div>
                <MessageModal open={modal===true} close={onClickClose} confirm={onClickLogin} header="로그인">로그인이 필요합니다.</MessageModal>
                </FixData>
            ))}

        </All>

    )
}
export default Info;
