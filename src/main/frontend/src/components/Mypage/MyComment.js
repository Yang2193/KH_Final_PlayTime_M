import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAPI from "../../api/PostApi";
import AccountApi from "../../api/AccountApi";
import { Link } from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";
import MessageModal from "../../utils/MessageModal";


const MyCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyCommentCloseButton = styled.div`
  cursor: pointer;
  color: #495057;
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;

  @media (max-width: 412px) {
    margin-left: auto;
    margin-bottom: auto;
  }
`;

const MyCommentCard = styled.div`
  display: flex;
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (max-width: 412px) {
    flex-direction: column;
  }
`;

const MyCommentTitle = styled.h3`
  font-size: 100%;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  text-decoration: none;
  color: #000;
  @media (max-width: 412px) {
    font-size: 18px;
  }
`;


const MyCommentDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;


`;

const MyCommentDate = styled.p`
  font-size: 12px;
  color: black;
`;

const MyCommentPageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  width: 768px;

`;

const MyCommentImage = styled.img`
  width: 200px;
  height: 250px;
  margin-right: 20px;
  background-color: #f0f0f0;


  @media (max-width: 412px) {
    width: 100%;
    height: 350px;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const MyCommentContent = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */

`;

const MyCommentEmptyMessage = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;

`;



const MyComment = () => {
  const userId = localStorage.getItem('userId');
  const [commentList, setCommentList] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);

  const onClickClose = () => {
    setDeleteMessage(false);
}
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };


  const increaseViews = async (postId) => {
    try {
      await PostAPI.increasePostViews(postId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const myCommentList = async () => {
      try {
        const response = await AccountApi.getMemberComment(userId);
        if (response.status === 200) {
          setCommentList(response.data);
          console.log(response);
        }
      } catch (e) {
        console.log(e);
      }
    };
    myCommentList();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await PostAPI.deleteComment(commentId);
      if (response.status === 200) {
        // 댓글 삭제 후, 댓글 목록을 갱신합니다.
        const updatedComments = commentList.filter((comment) => comment.id !== commentId);
        setCommentList(updatedComments);
        console.log('댓글이 삭제되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }

  };

  const isSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};
  const formatWriteDate = (date) => {
    const currentDate = new Date();
    const writeDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    if (isSameDay(currentDate, writeDate)) {
        const formattedTime = writeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `오늘 ${formattedTime}`;
    } else {
        const formattedDate = writeDate.toLocaleDateString('ko', options);
        return formattedDate;
    }
};

  return (
    <>
      <Header/>
      <MyCommentContainer>
      <MyCommentPageTitle>내 댓글 목록</MyCommentPageTitle>
        {commentList.length === 0 ? (
          <MyCommentEmptyMessage>댓글이 없습니다.</MyCommentEmptyMessage>
        ) : (
          commentList.map((cl) => (
            <MyCommentCard key={cl.id}>
              <MyCommentContent>
                <Link to={`/post/${cl.postId}`} onClick={() => increaseViews(cl.postId)}>
                  <MyCommentTitle>{cl.postTitle}</MyCommentTitle>
                </Link>
                <MyCommentDescription dangerouslySetInnerHTML={{ __html: cl.commentContent }}></MyCommentDescription>
                <MyCommentDate>{formatWriteDate(cl.commentDate)}</MyCommentDate>
              </MyCommentContent>
              <MyCommentCloseButton onClick={() => setDeleteMessage(true)}>✕</MyCommentCloseButton>
              {deleteMessage && (<MessageModal open={deleteMessage} confirm={() => handleDeleteComment(cl.id)} close={onClickClose} type="modalType" header="댓글 삭제">작성 했던 댓글을 삭제하시겠습니까?</MessageModal>)}
            </MyCommentCard>
          ))
        )}
      </MyCommentContainer>
      <Footer />
    </>
  );
};

export default MyComment;