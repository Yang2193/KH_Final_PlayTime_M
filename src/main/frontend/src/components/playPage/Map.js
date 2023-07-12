import React, { useState,useEffect } from "react";
import PlayInfoApi from "../../api/PlayInfoApi";
import KakaoMap from "./KaKaoMap";
import styled from "styled-components";

const MapStyle = styled.div`
width: 100%;
    .mapInfo{
        width: 100%;
        @media (max-width: 768px) {
        display: flex ;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    }
    .map{

        @media (max-width: 768px) {
        width: 95%;
        font-size: 1.1em;
        h3{
        font-size: 1.3em;
        }
    }
    }

`

const Map = ({theaterId}) =>{

    const [theaterInfo, setTheaterInfo] = useState();
    useEffect(() => {
        const theater = async () => {
            const rsp = await PlayInfoApi.theaterDetail(theaterId); // 극장 정보 불러오기
            setTheaterInfo(rsp.data);
        };
        theater();
    }, []);

    return(
        <MapStyle>
            {theaterInfo && theaterInfo.map(m => (
            <div className="mapInfo" key={m.theaterId}>
                <div className="map">
                    <h3>공연장 정보</h3>
                    <p>장소 : {m.theaterName}</p>
                    <p>주소 : {m.theaterAddr}</p>
                    {m.theaterCall === "" ? null :<p>대표번호 : {m.theaterCall}</p>}
                </div>
            <KakaoMap
                theaterLat={m.theaterLat}
                theaterLon={m.theaterLon}
                theaterName={m.theaterName}/>
            </div>
            ))}
        </MapStyle>
    )
}

export default Map;