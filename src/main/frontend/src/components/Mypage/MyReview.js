import React, { useState } from "react";
import PostAPI from "../../api/PostApi";
import { Link, useNavigate } from 'react-router-dom';
import AccountApi from "../../api/AccountApi";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import { toast, ToastContainer } from 'react-toastify';
const MyReviewContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyReviewCloseButton = styled.div`
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

const MyReviewCard = styled.div`
  display: flex;
  width: 80%;
  max-width: 600px;
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

const MyReviewTitle = styled.h3`
  font-size: 100%;
  font-weight: bold;
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


const MyReviewDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;


`;

const MyReviewDate = styled.p`
  font-size: 12px;
  color: black;
`;

const MyReviewPageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;

`;

const MyReviewImage = styled.img`
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

const MyReviewContent = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */

`;

const MyReviewEmptyMessage = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;

`;

const MyReview = () => {
  const nav = useNavigate();
  // 로그인 한 회원정보 가져오기
  const userId = localStorage.getItem('userId');

  // 리뷰 내역 저장
  const [posts, setPosts] = useState([]);

  const increaseViews = async (postId) => {
      try {
        await PostAPI.increasePostViews(postId);
      } catch (error) {
        console.log(error);
      }
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
  const deletePost = async (postId) => {
    const confirmDelete = window.confirm('게시물을 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        const response = await PostAPI.deletePost(postId);
        if (response.status === 200) {
          toast.error('게시물이 삭제되었습니다.');
          // 삭제된 게시물을 화면에서 제거
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const isSameDay = (date1, date2) => {
      return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
      );
  };

  useEffect(() => {
    const memberReviewList = async() => {
      try {
        const response = await AccountApi.getMemberReview(userId);
        if (response.status === 200){
          setPosts(response.data);
          console.log(posts);
        } else {
          console.log('불러오기 실패');
        }
      } catch (e) {
        console.log(e);
      }
    };
    memberReviewList();
  }, [])


  console.log(posts);
  return (
    <>
      <Header />
      <MyReviewContainer>
        <MyReviewPageTitle>나의 게시물</MyReviewPageTitle>
        {posts.length === 0 ? (
          <MyReviewEmptyMessage>게시물이 없습니다.</MyReviewEmptyMessage>
        ) : (
          posts.map((post) => (
            <MyReviewCard key={post.id}>
              <Link to={`/post/${post.id}`} onClick={() => increaseViews(post.id)}>
                {post.postImageUrl ? (
                  <MyReviewImage src={post.postImageUrl} alt="게시물 이미지" />
                ) : (
                  <MyReviewImage src="" alt="x" />
                )}
              </Link>
              <MyReviewContent>

                <Link to={`/post/${post.id}`} onClick={() => increaseViews(post.id)}>
                  <MyReviewTitle>{post.postTitle}</MyReviewTitle>
                </Link>
                <MyReviewDescription dangerouslySetInnerHTML={{ __html: post.postContent }}></MyReviewDescription>
                <MyReviewDate>{formatWriteDate(post.postDate)}</MyReviewDate>
              </MyReviewContent>
              <MyReviewCloseButton onClick={() => deletePost(post.id)}>✕</MyReviewCloseButton>
            </MyReviewCard>
          ))
        )}
      </MyReviewContainer>
      <Footer />
    </>
  );
}

export default MyReview;