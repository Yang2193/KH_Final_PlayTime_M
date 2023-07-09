import styled from 'styled-components';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import PostAPI from '../../api/PostApi';

const SearchContainer = styled.div`
  position: relative;
  top: 5%;
  border: 0.2rem solid #990a2c;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  z-index: 1;
  background-color: white;
  @media (max-width: 768px) {
    width: 60%;
    top: 0%;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 90%;
  border: none;
  border-style: none;
  outline: none;
  position: absolute;
  left: 20px;
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SearchButton = styled(MdSearch)`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
`;

const SearchBar = ({ handleSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const onClickSearch = async () => {
    try {
      const rsp = await PostAPI.searchPosts(keyword);
      if (rsp) {
        console.log(rsp);
        handleSearch(rsp);
        setIsSearchEmpty(false);
      } else {
        console.log('검색 결과를 가져오지 못했습니다.');
        setIsSearchEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  return(
    <SearchContainer>
      <Input
        placeholder="제목을 검색하세요!"
        value={keyword}
        onChange={onChangeKeyword}
        onKeyDown={handleKeyPress}
      />
      <SearchButton onClick={onClickSearch} />
      {isSearchEmpty && <p>검색 결과가 없습니다.</p>}
    </SearchContainer>
  );
};

export default SearchBar;
