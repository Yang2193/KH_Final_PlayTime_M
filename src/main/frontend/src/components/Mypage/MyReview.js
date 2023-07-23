import React, { useState } from "react";
import PostAPI from "../../api/PostApi";
import { Link, useNavigate } from "react-router-dom";
import AccountApi from "../../api/AccountApi";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import { toast, ToastContainer } from "react-toastify";
//import imgX from "../../images/gray.png"



const MyReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
`;

const MyReviewCloseButton = styled.div`
  cursor: pointer;
  padding: 6px 12px;
  background-color: #428bca;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  @media (max-width: 412px) {
    width: 50%;
    margin: 0 auto;
  }
`;

const MyReviewCard = styled.div`
  width: 230px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;

  @media (max-width: 412px) {
    flex-direction: column;

    margin: 10px;
    width: calc(100% - 100px);
  }
`;

const MyReviewTitle = styled.h2`
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
text-align: center;

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
  text-align: center;
  @media (max-width: 412px) {

  }
`;

const MyReviewImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  height: 300px;

  @media (max-width: 412px) {
    height: 300px;
    width: 100%;
  }
`;

const MyReviewContent = styled.div`

`;

const MyReviewEmptyMessage = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
`;

const MyReview = () => {
  const nav = useNavigate();
  // 로그인 한 회원정보 가져오기
  const userId = localStorage.getItem("userId");

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
    const options = { year: "numeric", month: "long", day: "numeric" };

    if (isSameDay(currentDate, writeDate)) {
      const formattedTime = writeDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `오늘 ${formattedTime}`;
    } else {
      const formattedDate = writeDate.toLocaleDateString("ko", options);
      return formattedDate;
    }
  };
  const deletePost = async (postId) => {
    const confirmDelete = window.confirm("게시물을 삭제하시겠습니까?");

    if (confirmDelete) {
      try {
        const response = await PostAPI.deletePost(postId);
        if (response.status === 200) {
          toast.error("게시물이 삭제되었습니다.");
          // 삭제된 게시물을 화면에서 제거
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
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
    const memberReviewList = async () => {
      try {
        const response = await AccountApi.getMemberReview(userId);
        if (response.status === 200) {
          setPosts(response.data);
          console.log(posts);
        } else {
          console.log("불러오기 실패");
        }
      } catch (e) {
        console.log(e);
      }
    };
    memberReviewList();
  }, []);

  console.log(posts);
  return (
    <>
      <Header />
      <MyReviewPageTitle>나의 후기</MyReviewPageTitle>
      <MyReviewContainer>
        {posts.length === 0 ? (
          <MyReviewEmptyMessage>게시물이 없습니다.</MyReviewEmptyMessage>
        ) : (
          posts.map((post) => (
            <MyReviewCard key={post.id}>
              <Link
                to={`/post/${post.id}`}
                onClick={() => increaseViews(post.id)}
              >
                {post.postImageUrl ? (
                  <MyReviewImage src={post.postImageUrl} alt="게시물 이미지" />
                ) : (
                  <MyReviewImage  alt="" />
                )}
              </Link>
              <MyReviewContent>
                <Link
                  to={`/post/${post.id}`}
                  onClick={() => increaseViews(post.id)}
                >
                  <MyReviewTitle>{post.postTitle}</MyReviewTitle>
                </Link>
                <MyReviewDescription
                  dangerouslySetInnerHTML={{ __html: post.postContent }}
                ></MyReviewDescription>
                <MyReviewDate>{formatWriteDate(post.postDate)}</MyReviewDate>
              </MyReviewContent>
              <MyReviewCloseButton onClick={() => deletePost(post.id)}>
                삭제
              </MyReviewCloseButton>
            </MyReviewCard>
          ))
        )}
      </MyReviewContainer>
      <Footer />
    </>
  );
};

export default MyReview;