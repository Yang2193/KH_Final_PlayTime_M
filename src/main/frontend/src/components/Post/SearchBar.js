import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import PostAPI from '../../api/PostApi';
import React, { useState } from 'react';

const SearchContainer = styled.div`
  position: relative;
  top: 0px;
  display: flex;
  align-items: center;
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 10px;
  font-size: 16px;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  color: #990A2C;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
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

  return (
    <SearchContainer>
      <Input
        placeholder="검색하세요!"
        value={keyword}
        onChange={onChangeKeyword}
        onKeyDown={handleKeyPress}
      />
      <SearchButton onClick={onClickSearch}>
        <MdSearch />
      </SearchButton>
      {isSearchEmpty && <p>검색 결과가 없습니다.</p>}
    </SearchContainer>
  );
};

export default SearchBar;
