import React, { useState,useEffect } from "react";
import PlayInfoApi from "../../api/PlayInfoApi";
import KakaoMap from "./KaKaoMap";


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
        <>
            {theaterInfo && theaterInfo.map(m => (
            <div key={m.theaterId}>
                <h3>공연장 정보</h3>
                <p>장소 : {m.theaterName}</p>
                <p>주소 : {m.theaterAddr}</p>
                {m.theaterCall === "" ? null :<p>대표번호 : {m.theaterCall}</p>}
            <KakaoMap 
                theaterLat={m.theaterLat}
                theaterLon={m.theaterLon}
                theaterName={m.theaterName}/>
            </div>
            
            ))}

        </>
    )
}

export default Map;