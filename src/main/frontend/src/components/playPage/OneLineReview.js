import React, { useEffect, useState } from 'react';
import PostAPI from '../../api/PostApi';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { Button } from "../../utils/GlobalStyle";
import MessageModal from '../../utils/MessageModal';
import PageNation from '../../utils/PageNation';

const OneCss=styled.div`
  width: 1140px;
  height: 100%;
  @media (max-width:1364px) {
      width:818px;
  }
  @media (max-width:768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  @media (max-width:412px) {
    overflow: hidden;
  }
.average{
  width: 100%;
  border-bottom: 1px solid;
  font-size: 1.5em;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 1%;
  @media (max-width:768px) {
    width: 600px;
  }
  @media (max-width:412px) {
    margin-top: 10px;
    font-size:1em;
    width: 360px;
  }
  @media (max-width:360px) {
    width: 310px;
  }
}
.empty{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
}
h2{
  width: 100%;
}
.addReview{
  @media (max-width:768px) {
    width: 80%;
  }
  @media (max-width:412px) {
    width: 90%;
    height: 150px;
  }
  .ratingBox{
    width: 100%;
  }
  border: 1px solid;
  border-radius: 10px;
  border-color: #eee;
  padding: 1%;
  width: 100%;
  height: 30%;
  textarea{
    margin: 0;
    border: none;
    outline: none;
    resize: none;
    height: 150px;
  @media (max-width:412px) {
    height: 85px;
  }
  }
  .add{
    height:25px;
    margin: 0 5px;
  }
}
.selectReview{
  @media (max-width:768px) {
    width: 80%;
  }
  .btns{
    position: relative;
    top:45px;
      width: 100%;
      text-align: end;
      button{
        margin-left: 2%;
      }
    }
  border-bottom: 1px solid;
  border-color: #eee;
  padding: 1%;
  .read{
    height:20px;
  }
  p{
    span{
      font-size: 0.8em;
      color:#ccc;
    }
  }
}
.btn{
  width: 100%;
  text-align: end;
  @media (max-width:412px) {
    height: 15%;
    display: flex;
    justify-content: end;
  }
  button{
    font-size: 1em;
    border-radius: 5px;
    width: 10%;
    height: 100%;
    border: none;
    cursor: pointer;
    @media (max-width:412px) {
      width: 12%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8em;
  }
  }
}
.updateText{
  margin: 0;
    outline: none;
    resize: none;
    height: 10%;
}
`

const OneReview = () => {
  const [showInput, setShowInput] = useState(false);// 리뷰 수정
  const [reviews, setReviews] = useState([]); // 리뷰 불러오기
  const [rating, setRating] = useState(""); // 평점 입력
  const [content, setContent] = useState([]); // 내용 입력

// 수정용
  const [upRating, setUpRating] = useState("");
  const [upContent, setUpContent] = useState([]);

  const [modalOpen, setModalOpen] = useState(false); // 등록 완료 모달
  const[delMo,setDelMo]=useState(false);// 등록 삭제 모달
  const[upMo,setUpMo]=useState(false); // 등록 수정 모달
  const[logMo,setLogMo]=useState(false); // 등록 수정 모달

  const reviewId = parseInt(localStorage.getItem("reviewId"), 10);
  const userId = localStorage.getItem("userId");
  const playId = localStorage.getItem("playId");

  useEffect(() => {
    const getReview = async () => {
        const rsp = await PostAPI.getOLR(playId);
        if (rsp.status===200) {
          setReviews(rsp.data);
        }
    };
    getReview();
  }, [modalOpen,delMo,upMo]);

  const onChangeRating = e =>{
    setRating(e)
}
const onUpRating = e =>{
  setUpRating(e)
}
const onUpContent = e =>{
  if (e.target.value.length <= 100) {
    setUpContent(e.target.value);
  }
}
const onChangeContent = e =>{
  if (e.target.value.length <= 100) {
    setContent(e.target.value);
  }
}

const addReview = async () =>{
  if (userId===null) {
    setLogMo(true);
    resetInput();
    return;
  } else{
    const rsp = await PostAPI.addOLR(content,rating,userId,playId);
    if(rsp.status === 200) {
      console.log("성공");
      setModalOpen(true);
      resetInput();
    } else {
        console.log("전송 실패");
    }
  }
}
const deleteReview = async (id) =>{
  const rsp = await PostAPI.deleteOLR(id);
  if(rsp.status === 200) {
    console.log("성공");
    setDelMo(true);
  } else {
      console.log("전송 실패");
  }
}
const updateInput = (id) =>{
  localStorage.setItem("reviewId",id)
  setShowInput(true);
}

const updateReview = async (id) =>{
  const rsp = await PostAPI.updateOLR(id,upContent,upRating);
  if(rsp.status === 200) {
    console.log("성공");
    setUpMo(true);
    resetInput();
    setShowInput(false);
  } else {
      console.log("전송 실패");
  }
}

  const resetInput = () => {
    setRating("");
    setContent("");
    setUpContent("");
    setUpRating("");
  }
  const onClickClose = () => {
    setModalOpen(false);
    setDelMo(false);
    setUpMo(false)
    setLogMo(false)
    }
// 페이지 네이션
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호

    useEffect(() => {
        setCurrentPage(0);
    }, [reviews])

    const ITEMS_PAGE = 5; // 보여질 아이템 개수

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
      };
    const pageCount = Math.ceil(reviews.length / ITEMS_PAGE); // 페이지 수 계산
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = reviews.slice(offset, offset + ITEMS_PAGE);
  return (
    <OneCss>
        {reviews.length > 0 ?
        <div className='average'>한줄평 ({reviews.length}) <span>{(reviews.reduce((total, review) => total + review.olrRating, 0) / reviews.length).toFixed(1)} / 5.0</span> </div>
        :<div className='average'>한줄평 (0) <span> 0 / 5.0</span> </div>
      }
        <div className='addReview'>
        <div className='ratingBox'>
          <Rating
          size={"25px"}
          className='add'
          onClick={onChangeRating}
          initialValue={rating}
          allowFraction/> {rating===""? "별점을 선택해주세요." : `${rating} 점`}
        </div>
        <textarea onChange={onChangeContent} value={content} placeholder='관람후기를 남겨보세요!'></textarea>
        <div className='btn'>
          <Button onClick={addReview}>등록</Button>
        </div>
      </div>


      {currentPageData && currentPageData.length > 0 ? currentPageData.map(review => (
        <div className='selectReview' key={review.id}>
          {userId ===review.memberInfo.userId ?
            <div className='btns'>
              {showInput === true && review.id===reviewId ? <button onClick={()=>updateReview(review.id)}>수정 완료</button> : <button onClick={()=> updateInput(review.id)}>수정</button>}
                <button onClick={()=>deleteReview(review.id)}>삭제</button>
            </div> : null}
          {showInput && reviewId===review.id ?
            <p className='updateP'>
              <Rating
                size={"25px"}
                className='add'
                onClick={onUpRating}
                initialValue={upRating}
                allowFraction/>
            </p> :
            <p><Rating size={"20"} className='read' initialValue={review.olrRating} allowFraction readonly/></p>}
          {showInput && reviewId===review.id ? <textarea className='updateText' onChange={onUpContent} value={upContent}></textarea> : <p>{review.olrContent}</p>}
          <p>{review.memberInfo.userNickname} <span>{(new Date(review.olrDate)).toLocaleString('ko')}</span></p>
        </div>
      ))
      : <div className='empty'>관람후기를 등록해주세요</div>}

      <MessageModal open={modalOpen} close={onClickClose} header="등록 완료">리뷰가 등록 되었습니다.</MessageModal>
      <MessageModal open={delMo} close={onClickClose} header="삭제 완료">리뷰가 삭제 되었습니다.</MessageModal>
      <MessageModal open={upMo} close={onClickClose} header="수정 완료">리뷰가 수정 되었습니다.</MessageModal>
      <MessageModal open={logMo} close={onClickClose} header="로그인 알림">로그인이 필요 합니다.</MessageModal>
      {pageCount > 1 && <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>}

    </OneCss>
  );
};

export default OneReview;
