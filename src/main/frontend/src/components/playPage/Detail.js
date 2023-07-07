import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayInfoApi from "../../api/PlayInfoApi";

const DetailBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div{
        width: 100%;
        display: flex;
        flex-direction: column;
  
    }
    .more{
        border: none;
        cursor: pointer;
        height: 20%;
    }
    .imageBox{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img{
            width: 50%;
            @media (max-width:768px) {
                width: 100%;
            }
        }
    }

`
const Detail = () =>{
    const playId = localStorage.getItem("playId");
    const [playInfo,setPlayInfo] = useState(null);

    useEffect(()=>{
        const play = async()=>{
            const rsp = await PlayInfoApi.selectPlayInfo(playId);
            setPlayInfo(rsp.data);
        };
        play();
    },[])

    return(
        <DetailBox>
        {playInfo && playInfo.map(play =>(
            <div key={play.playId}>
                <div className="detail">
                    <h3>상세 정보</h3>
                    <div className="imageBox">
                        {play.playDescImg1 && play.playDescImg1.replace(/\[|\]/g, '').split(',').map((img, index) => (
                            <img key={index} src={img.trim()} alt="" />
                        ))}                       
                    </div>
                </div>
            </div>
        ))}
        </DetailBox>
    )
}

export default Detail;