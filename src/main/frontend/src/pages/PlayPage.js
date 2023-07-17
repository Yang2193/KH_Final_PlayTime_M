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
import logo from "../images/logo-no-background.png";

const Contents = styled.div`
    width: 60%;
    position: relative;
    left: 20%;
    @media (max-width: 768px) {
        position: static;
        width: 100%;
    }
    
`
const All = styled.div`
    width: 100%;
    @media (max-width:412px) {
        width: 412px;
}
`

const PlayPage = () => {
    const[type,setType] = useState("default");

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

    return(
      <All>
            <Header/>
            {playInfo && playInfo.map(play =>(
            <Contents key = {play.playId}>
                <Info/>
                <PlayNav  handleType={handleType}/>
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
                <Footer/>
            </div>
        </All>
    )
}

export default PlayPage;