import React,{ useState,useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlayNav from "../components/playPage/PlayNav";
import Map from "../components/playPage/Map";
import Detail from "../components/playPage/Detail";
import Info from "../components/playPage/Info";
import styled from "styled-components";
import PlayInfoApi from "../api/PlayInfoApi";
import OneReview from "../components/playPage/OneLineReview";
const Contents = styled.div`
    width: 60%;
    position: relative;
    @media (max-width:2560px) {
        left: 27.5%;

    }
    @media (max-width:1920px) {
        left: 20%;
    }
    @media (max-width: 768px) {
        position: unset;
        width: 100%;
        overflow: hidden;
        left: 0;
    }

`
const All = styled.div`
    width: 100%;
`


const PlayPage = () => {
    const[type,setType] = useState("default");
    const [showPlayNav, setShowPlayNav] = useState(false); // State 추가

	const handleType = (e) =>{
		setType(e);

	}
    const [playInfo,setPlayInfo] = useState(null);
    const playId = localStorage.getItem("playId");
    useEffect(()=>{
        const play = async()=>{
            const rsp = await PlayInfoApi.selectPlayInfo(playId);
            setPlayInfo(rsp.data);
        };
        play();
    },[])

    useEffect(() => {
        // 0.5초 뒤에 PlayNav 컴포넌트 보여주기
        const timeout = setTimeout(() => {
          setShowPlayNav(true);
        }, 500);

        // 컴포넌트가 언마운트될 때 타이머를 정리 (cleanup)
        return () => clearTimeout(timeout);
      }, []);

    return(
        <All>
            <Header/>
            {playInfo && playInfo.map(play =>(
            <Contents key = {play.playId}>
                <Info/>
                {showPlayNav && <PlayNav handleType={handleType} />}
                {type === "default" &&(
                    <Detail/>
                )}
                {type === "map" &&(
                    <Map theaterId={play.theaterId} />
                )}
                {type === "review" &&(
                    <OneReview/>
                )}
            </Contents>
            ))}
            <div className="footer">
                {showPlayNav && <Footer/>}
            </div>
        </All>
    )
}

export default PlayPage;