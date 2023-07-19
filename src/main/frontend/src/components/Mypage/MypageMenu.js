import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components";

const categories = [
    {
        name :'menu1',
        text : '내정보 / 수정'
    },
    {
        name :'menu2',
        text : '내가 쓴 리뷰'
    },
    
    {
        name :'menu3',
        text : '찜 목록'
    },
    
    {
        name :'menu4',
        text : '구매 내역'
    },
    {
        name :'menu5',
        text : '회원 탈퇴'
    }
];
const MenuBlock = styled.div`
    background-color: #FBF4EF;
    width: 300px;
    height: auto;
    text-align: center;
    position: fixed;
    border-radius: 5px;
    border: 3px solid #F0B7A2;
    border-style: double;
    margin-top: 120px; /* 헤더의 높이만큼 여백을 추가 */
    margin-right: 10px;
    top: 0;
    left: 0;
        .title{
            font-size: 25px;
            font-weight: bold;
            position: relative;
            top: 10px;
            left: 0;
            right: 0;
            margin: auto;
        }
        hr{
            border: 1px solid #FF7F50;
            width: 80%;
            margin-bottom: 2rem;
        
    }
`;

const Category = styled.div`
    cursor: pointer;
    padding-bottom: 2rem;
    text-align: center;
    &:hover {
        color:#FF7F50;
    }
    ${props => 
        props.active && css`
        font-weight: 600;
        color: #FF7F50;
        &:hover {
            color: #FF7F50;
        }
    `}
    & + & {
        margin-bottom: 0.7rem;
    }
`;
const MenuBar = ({onSelect, category}) => {
    const navigate = useNavigate();
    const handleLinkClick = (path,category) => {
    const queryParams = new URLSearchParams();
    if(category) queryParams.set("category", category);
    navigate({ pathname: path, search: queryParams.toString() }); 
    onSelect(category);
    };

    return(
        <MenuBlock>
            <Category key="nomal" onClick={()=>navigate('/MyPage')}>
            <span className="title">마이페이지</span>               
            </Category>
            <hr />
          
        {categories.map(c=>(
            <Category key={c.name} active={category===c.name} onClick={()=>handleLinkClick("/Mypage",c.name)}>
            {c.text}                
            </Category>
        ))}

        
        </MenuBlock>
    );
}

export default MenuBar;