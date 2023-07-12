import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../utils/GlobalStyle";
import PlayInfoApi from "../../api/PlayInfoApi";
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import MessageModal from "../../utils/MessageModal";

const FixData = styled.div`
    width: 100%;
    height: 80vh;
    @media (max-width:768px) {
        width:100%;
        height: 100%;
    }
    h1{
        font-size: 1.5em;
        margin: 0;
        padding-bottom: 2%;
        margin-bottom: 4%;
        border-bottom: 3px solid;
    }
    .content{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        @media (max-width:768px) {
            width:100%;
            height: 100%;
            flex-direction: column;
    }
        img {
            border-radius: 15px;
            width: 35%;
            height: 65%;
            margin-right:5%;
            @media (max-width:768px) {
                margin: 0;
                width: 80%;
                height: 30%;
                margin-top: 5%;
            }
        }

        .textBox{
            width: 60%;
            height: 65%;
            @media (max-width:768px) {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 5%;
                flex-direction: column;

            }
        }
        .like{
            text-align: end;
            @media (max-width:768px) {
                width: 80%;
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
                width: 80%;
                height: 80%;
                font-size: 1em;
                bottom:40px;
            }
            @media (max-width:412px) {
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
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 50px;
            z-index: 2;
            }
        button{
            width: 100%;
            height: 100%;
            font-size: 1.2em;
            border: none;
            cursor: pointer;    
            @media (max-width:768px) {
                border-radius: 0%;
                width: 100%;
                
            }     
        }
       button:hover{
        background-color:#790A2C ;
       }
    }
   
`

const Info = () =>{
    const [modalOpen, setModalOpen] = useState(false);
    const [playInfo,setPlayInfo] = useState(null);
    const playId = localStorage.getItem("playId"); // 연극 아이디
    const userId = localStorage.getItem("userId"); // 유저 아이디
    const navigate = useNavigate();
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
            setModalOpen(true);
            return;
        }else{
            if (!isLiked) {
                addLike();
            } else {
                deleteLike();
            }
        }
    }; 

    // 예매하기
    const reserve = (playPlan,price,title,theaterId)=> {
        if (userId===null) {
            setModalOpen(true);
            return;
        } else {
            localStorage.setItem("time",playPlan)
            localStorage.setItem("price",price)
            localStorage.setItem("titleInfo",title) 
            localStorage.setItem("theaterId",theaterId) 
            navigate("/reserve")
        }
    }
      //모달창 닫기
        const onClickClose = () => {
        setModalOpen(false);
        }
       //로그인 페이지로
        const onClickLogin = () => {
        setModalOpen(false);
        navigate("/login");
        }
    return(
      <>
              {playInfo && playInfo.map(play =>(
                <FixData key = {play.playId}>
                        <div className="content">
                            <img src={play.playPoster} alt="" />
                            <div className="textBox">
                            <div className="like"><FaHeart onClick={()=>onClickLiked()} style={{fontSize: '200%', cursor:"pointer", color: isLiked ? "red" : "#999999" }}/></div>
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
                                    <Button onClick={()=>reserve(play.playPlan,play.playPrice,play.title,play.theaterId)}>예매 하기</Button>
                                </div>
                        </div>
                    </div>
                    </FixData>
                ))}
            </>
    );
}
export default Info;
