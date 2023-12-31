import styled from "styled-components"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import PageNation from "../../utils/PageNation";
import { useNavigate } from "react-router-dom";

const ListBox = styled.div`
    position: relative;
    top: 10%;
    margin: 0 auto;
    width: 70%;
    @media (max-width: 768px) {
        width: 80%;
        font-size: 80%;

        td .img-thumb{
            width: 60px;
            height: 80px;
        }
    }
    @media (max-width: 412px) {
       font-size : 60%;
       top: 5%;
  }  

    .bar{
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    table{
        width : 100%;
    }

    thead, tbody{
        width : 100%
    }
    
    thead th{
        background-color: #990A2C;
        color: #fff;
    }
    
    tbody td{
        border-bottom: 1px dotted #999;
    }

    td{
        height: 100px;
        text-align: center;
        font-size: 1rem;
        padding: 10px 0;
        cursor: pointer;

        @media (max-width: 768px) {
        font-size: 0.8rem;
        }
        @media (max-width: 412px) {
       font-size : 0.6rem;
  }  
    }

    .img-thumb{
            width: 90px;
            height: 120px;
            margin: 0 auto;
            border: 1px solid #b9b9b9;
            vertical-align: middle;
        }
                    
    .menu p{
        margin: 0 20px;
    }
`
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
   .resetButton{
    color: white;
    background-color: #990A2C;
    border-radius: 4px;
    border: 1px solid #990A2C;
    width: 120px;
    height: 50px;
    font-size: 1.2rem;
    cursor: pointer;
   }
  `

const PlayList = ({playList, handlePlayList, initialPlayList}) => {
    
    const nav = useNavigate();
    const movePage = useCallback(
        (playId) => {
          localStorage.setItem("playId", playId);
          nav("Info");
        },
        [nav]
      );
      

    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
    const [loading, setLoading] = useState(true);


    const handleResetPlaylist = useCallback(() => {
      handlePlayList(initialPlayList);
    }, [initialPlayList]);

    useEffect(() => {  
        setCurrentPage(0);
    }, [playList])

    useEffect(() => {
      if(playList.length > 0){
        setLoading(false);
      }
    }, [playList])


    const ITEMS_PAGE = 10; // 보여질 아이템 개수

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
      };
    
    const pageCount = Math.ceil(playList.length / ITEMS_PAGE); // 페이지 수 계산
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = playList.slice(offset, offset + ITEMS_PAGE);

    const playListMap = useMemo(() => {
        if (currentPageData && currentPageData.length > 0) {
          return currentPageData.map((pl) => (
            <tr key={pl.playId} onClick={() => movePage(pl.playId)}>
              <td className="image">
                <img src={pl.imageUrl} alt="image1" className="img-thumb" />
              </td>
              <td className="title">{pl.title}</td>
              <td className="location">{pl.theaterName}</td>
              <td className="period">
                {pl.periodStart} ~ {pl.periodEnd}
              </td>
            </tr>
          ));
        } else {
          return (
            <tr>
              <td colSpan={4}>검색 결과가 존재하지 않습니다.</td>
            </tr>
          );
        }
      }, [currentPageData]);
      

    return(
        <>
            <ListBox>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>상품명</th>
                                <th>장소</th>
                                <th>기간</th>
                            </tr>
                        </thead>
                        <tbody>
                        {playList.length > 0 ? (
                                                   playListMap
                                             ) : (
                          <tr>
                            <td colSpan={4}>{loading ? "로딩 중입니다." : "검색 결과가 존재하지 않습니다."}</td>
                          </tr>
                        )}
                        </tbody>
                    </table>
                    {((!loading)&&(playList !== initialPlayList)) && 
                    <ButtonBox>
                      <button className="resetButton" onClick={handleResetPlaylist}>돌아가기</button>
                    </ButtonBox>
                      }
            </ListBox>
            {pageCount > 1 && <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>}
        </>

    )
}

export default PlayList;