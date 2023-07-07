import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import styled from "styled-components";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import MainApi from "../api/MainApi";
import PlayList from "../components/main/PlayList";

const Container = styled.div`
    height: 100vh;
    position: relative;
    overflow-x: hidden;
`

const MainPage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [playList, setPlayList] = useState([]);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const rsp = await MainApi.getPlayList();
                if(rsp.status === 200){
                    setPlayList(rsp.data);
                    console.log(rsp.data);
                }
            } catch(error){
                console.error(error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        console.log(playList);
    }, [playList])

 
    const handlePlayList = (playlist) => {
        setPlayList(playlist);
    }


    return(
        <Container> 
             {isMobile ? (
            <Header>
                <SearchBox handlePlayList={handlePlayList}/>
            </Header>) : (
                <>
                    <Header></Header>
                    <SearchBox handlePlayList={handlePlayList}/>
                </>
            )}
            <PlayList playList={playList}/>
            <Footer/>
        </Container>
    )
}

export default MainPage