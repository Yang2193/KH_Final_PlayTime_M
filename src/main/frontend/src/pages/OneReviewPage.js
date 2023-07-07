import React, { useEffect, useState } from 'react';
import './OneReview.css';
import ExApi from '../api/PostApi';
import { HiStar } from 'react-icons/hi';

const OneReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ExApi.OneList();
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<HiStar key={i} size={20} color="#FDE300" />);
    }

    return stars;
  };

  return (
    <div className="OneReviewWrapper">
      <h2>한 줄 리뷰</h2>
      <table className="OneReviewTable">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>한줄평</th>
            <th>평점</th>
            <th>작성 날짜</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.oneNo}>
              <td>{review.oneNo}</td>
              <td>{review.oneTitle2}</td>
              <td>{review.oneTitle}</td>
              <td>{renderStars(review.oneRating)}</td>
              <td>{review.oneWriteDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OneReview;
