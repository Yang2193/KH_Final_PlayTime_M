import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PostAPI from '../api/PostApi';
import PageNation from '../utils/PageNation';
import '../pages/ReviewBoard.css';
import SearchBar from '../components/Post/SearchBar';
import PopularPosts from '../components/Post/PopularPosts';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const ITEMS_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rsp = await PostAPI.getAllPosts();
        console.log(rsp);
        if (rsp.status === 200) {
          setPosts(rsp.data);
          setSortedPosts(rsp.data);
        } else {
          console.log('데이터가 없거나 불러오기를 실패함');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      return ` ${formattedTime}`;
    } else {
      const formattedDate = writeDate.toLocaleDateString('ko', options);
      return formattedDate;
    }
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const pageCount = Math.ceil(sortedPosts.length / ITEMS_PAGE);
  const offset = currentPage * ITEMS_PAGE;
  const currentPageData = sortedPosts.slice(offset, offset + ITEMS_PAGE);

  const handleSearch = (searchedPosts) => {
    if (searchedPosts.length === 0) {
      setIsSearchEmpty(true);
    } else {
      setIsSearchEmpty(false);
    }
    setSortedPosts(searchedPosts);
    setCurrentPage(0);
  };

  return (
    <>
      <Header />

      <div className="ReviewBoardWrapper">
        <h2>리뷰 게시판</h2>
        <PopularPosts popularPosts={sortedPosts} />
        <table className="ReviewTable">
          <thead>
            <tr>
              <th className='title alignCenter'>제목</th>
              <th className='WriteDate'>작성 날짜</th>
              <th className="text_id">닉네임</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((post) => (
              <tr
                className={`ReviewItem ${
                  post.memberInfo?.userNickname === '운영자' ? 'AdminRow' : ''
                }`}
                key={post.id}
              >
                <td className="ReviewTitle">
                  <Link
                    to={`/post/${post.id}`}
                    className="ReviewLink"
                    onClick={() => increaseViews(post.id)}
                  >

                    {window.innerWidth > 412
                      ? post.postTitle.length > 20
                        ? `${post.postTitle.slice(0, 25)}...`
                        : post.postTitle
                      : post.postTitle.length > 15
                      ? `${post.postTitle.slice(0, 25)}...`
                      : post.postTitle}
                  </Link>
                </td>
                <td className="WriteDate DateContainer">{formatWriteDate(post.postDate)}</td>

                <td className="Id">{post.memberInfo ? post.memberInfo.userNickname : ''}</td>
                <td className="Views">{post.postViews}</td>
              </tr>
            ))}
          </tbody>
        </table>


        <SearchBar className="Search" handleSearch={handleSearch} />
        <div className="ButtonContainer">
          <Link to="/postUpload" className="linkPo">
            <button className="insert1">글쓰기</button>
          </Link>
        </div>
            {pageCount > 1 && <PageNation pageCount={pageCount} onPageChange={handlePageClick} />}
          </div>
      <Footer />
    </>
  );
};

export default Post;
