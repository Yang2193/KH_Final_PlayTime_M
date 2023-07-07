import MyReview from "./MyReview";
import MyPlayLike from "./MyPlayLike";
import MyTicketInfo from "./MyTicketInfo";
import styled from "styled-components";
import React from "react";
import MyPageMain from "./MyPageMain";
import MyProfileEdit from "./MyProfileEdit";
import MyProfileDelete from "./MyProfileDelete";

const SectionBlock = styled.div`
    background-color: #FBF4EF;
    border-radius: 5px;
    border: 3px solid #F0B7A2;
    border-style: double;
    width: calc(100% - 340px); /* 화면 너비에서 MenuBlock의 너비(300px)를 뺀 나머지만큼의 너비 */
    height: auto;
    margin-left: 320px; /* 왼쪽 여백 설정 */
    //margin-top: 20px; /* 상단 여백 설정 */
    padding: 20px; /* 내부 여백 설정 */
`;

const menuSelect = (name) => {
    switch(name){
        case "menu1" : 
        return <MyProfileEdit/>;
       
        case "menu2" : 
        return <MyReview/>;
       
        case "menu3" : 
        return <MyPlayLike/>;
    
        case "menu4" : 
        return <MyTicketInfo/>;

        case "menu5" :
        return <MyProfileDelete/>
        
        default:
           return <MyPageMain/>;
    }
}

const Section= ({category}) => {
    return(
        <SectionBlock>
        {menuSelect(category)}
        </SectionBlock>
    );
}

export default Section;