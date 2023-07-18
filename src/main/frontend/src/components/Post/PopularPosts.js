import React, { useEffect, useState } from 'react';
import PostAPI from '../../api/PostApi';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PopularPosts.css';

const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await PostAPI.getAllPosts();
        if (response.status === 200) {
          const sortedPosts = response.data.sort((a, b) => b.postViews - a.postViews);
          setPopularPosts(sortedPosts.slice(0, 20));
        } else {
          console.log('인기글 데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPopularPosts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="PopularPosts">
      <Slider {...settings}>
        {popularPosts
          .filter((post) => post.postImageUrl) // 이미지가 있는 게시물만 필터링
          .map((post) => (
            <div key={post.id} className="PopularPostItem">
              <Link to={`/post/${post.id}`} className="PopularPostLink">
                <div className="PopularPostThumbnail">
                  <div className="ThumbnailContainer">
                    <img src={post.postImageUrl} alt="" />
                  </div>
                </div>
                <div className="PopularPostContent">
                  <h4 className="PopularPostTitle">
                    {post.postTitle.length > 15 ? `${post.postTitle.slice(0, 15)}...` : post.postTitle}
                  </h4>
                </div>
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default PopularPosts;
