import React from "react";
import styled from "styled-components";
import { useState } from "react";
const NavBar = styled.div`
    width: 1140px;
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid;
    margin-bottom: 2%;
    @media (max-width:1364px) {
      width:818px;
      height: 50px;
    }
    @media (max-width:768px) {
      width: 100%;
    }
    @media (max-width:412px) {
        margin-top: 20px;
    }
    @media (max-width:360px) {
        margin-top: 0px;
    }
    ul{
      width: 100%;
      list-style: none;
      display: flex;
      padding: 0;
    }
    li{
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: white;
      font-size: 1em;
      font-weight: bold;
      cursor: pointer;
    }
    .nav-item {
    position: relative;
    cursor: pointer;
  }

.nav-item::before {
  content: "";
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: black;
  display: none;
}
.nav-item.active::before {
  display: block;
}
`

const PlayNav = ({ handleType }) => {
  const [activeIndex, setActiveIndex] = useState(0);// css nav 클릭시 밑줄 표시를 위함

  const onClickInfo = () => {
    handleType("default");
    setActiveIndex(0);
  }
  const onClickMap = () => {
    handleType("map");
    setActiveIndex(1);
  };
  const onClickReview = () => {
      handleType("review");
      setActiveIndex(2);
    };
    return (
      <NavBar>
        <ul>
          <li onClick={onClickInfo} className={activeIndex === 0 ? "nav-item active" : "nav-item"}>
            공연 정보
          </li>
          <li onClick={onClickMap} className={activeIndex === 1 ? "nav-item active" : "nav-item"}>
            장소 정보
          </li>
          <li onClick={onClickReview} className={activeIndex === 2 ? "nav-item active" : "nav-item"}>
            한줄평
          </li>
        </ul>
      </NavBar>
    );
  };

export default PlayNav;