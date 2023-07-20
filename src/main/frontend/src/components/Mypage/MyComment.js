import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAPI from "../../api/PostApi";
import AccountApi from "../../api/AccountApi";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";
import XIcon from "../../images/x-mark.png";


const Container = styled.div`
  padding: 20px;
  width: 1000px;
  margin: 0 auto;

  @media (max-width: 412px) {
    width: 90%;

  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const CommentTable = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }
  th {
    background-color: #f6f6f6;
    font-weight: bold;
  }
  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    &:hover {
      background-color: #f0f0f0;
    }
    th:first-child{
      width:20%;
    }
  }

  @media (max-width: 412px) {
    font-size: 14px;
  }
`;

const CommentContent = styled.td`
  position: relative;
`;

const DeleteButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  position: absolute;
  right: 5px;
  bottom: 5px;
  background-image: url(${XIcon});
  background-size: 100% 100%;
  width: 5px;
  height: 5px;

`;
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


const MyComment = () => {
  const userId = localStorage.getItem('userId');
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const myCommentList = async () => {
      try {
        const response = await AccountApi.getMemberComment(userId);
        if (response && response.status === 200) {
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

  return (
    <>
      <Header></Header>
      <Container>
        <Title>내 댓글 목록</Title>
        <CommentTable>
          <thead>
            <tr>
              <th>게시물 제목</th>
              <th>댓글 내용</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <Link to></Link>
            {commentList.map((cl) => (
              <tr className="commentItem" key={cl.id}>
                <td>{cl.postTitle}</td>
                <CommentContent>
                  <div>{cl.commentContent}</div>
                  <DeleteButton onClick={() => handleDeleteComment(cl.id)} > </DeleteButton>
                </CommentContent>
                <td>{formatDate(cl.commentDate)}</td> {/* Use the formatDate function here */}
              </tr>
            ))}
          </tbody>
        </CommentTable>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default MyComment;