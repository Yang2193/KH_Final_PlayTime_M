import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MessageModal from "../utils/MessageModal";
import styled, {css, keyframes} from "styled-components";
import AccountApi from "../api/AccountApi";




const MenuButton = styled.div`
  height  : 100px;
  width : 80px;
  position: absolute;
  border-radius : 16px;
  right: 16px;
  top: 0px;
  cursor: pointer;

  @media (max-width: 768px) {
        width: 60px;
        height: 100px;
        right: 8px;

    }
`;

const Box = styled.div`
    display: none;
    width: 260px;
    background-color: #fff;
    color: #990A2C;
    border-radius: 20px;
    position: absolute;
    top: 90px;
    left: -150px;
    border: 1px solid #990A2C;

    z-index: 3;

     @media (max-width: 768px) {
            left: -190px;
            top: 70px;

        }

        @media (max-width: 412px) {
            left: -190px;
            top: 50px;

        }

    ${({ isOpen }) =>
    isOpen &&
    css`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-content: center;
      animation: ${slideIn} 0.3s ease-in-out;

      .header{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;


      }



    .box{
        width: 260px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: center;


    }

      .item{
        height: 80px;
        width: 200px;
        border-top: 1px dotted #990A2C;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
            font-weight: bold;
        }
      }


    `}


`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;


const SideMenu = ({handleIsOpen, isOpen}) => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const userId = window.localStorage.getItem("userId");

    //팝업창
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {


        const clickOutside = (event) =>{
            if(ref.current && !ref.current.contains(event.target)){
                handleIsOpen(false);
            }
        };

        document.addEventListener("click", clickOutside);
        return () => {
            document.removeEventListener("click", clickOutside);
        };

    },[ref]);

    //모달창 닫기
    const onClickClose = () => {
        setModalOpen(false);
    }

    //로그인 페이지로
    const onClickLogin = () => {
        setModalOpen(false);
        navigate("/login");
    }


    const onClickMenu = () => {
        handleIsOpen(!isOpen);
    }

    const onClickBox = (event) => {
        event.stopPropagation();
    };

    const handleLinkClick = (path,category) => {
        const queryParams = new URLSearchParams();
        if(category) queryParams.set("category", category);
        navigate({ pathname: path, search: queryParams.toString() });
        handleIsOpen(false);
      };


    const logout = () => {
      if(localStorage.getItem("loginValue") === "DEFAULT"){
        localStorage.clear();
        navigate("/");
        handleIsOpen(!isOpen);
        setModalOpen("logout");
      } else if (localStorage.getItem("loginValue") === "KAKAO"){
        const clientId = "088a7b267c39d0a11ec3904372ed9d33";
        const redirectUri = "http://ticket-playtime.xyz/auth/kakao/logout";
        const authorizeUrl = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`;
        window.location.href = authorizeUrl;
        }
    }
    

    return(
        <MenuButton  onClick={onClickMenu} ref={ref}>
                <Box isOpen={isOpen} >
                   <div className="header">메뉴</div>
                    <div className="box" onClick={onClickBox}>
                            {userId ?
                                <div className="item" onClick={logout}>로그아웃</div>
                            :   <div className="item" onClick={()=> handleLinkClick("/Login")}>로그인/회원가입</div>
                            }
                            <div className="item" onClick={()=> handleLinkClick("/post")}>리뷰 게시판</div>
                            <div className="item" onClick={()=> handleLinkClick(!userId ? setModalOpen("login") : "/myPage")}>마이 페이지</div>
                    </div>
                </Box>
                <MessageModal open={modalOpen==="login"} close={onClickClose} confirm={onClickLogin} header="로그인">로그인이 필요한 페이지입니다.</MessageModal>
                <MessageModal open={modalOpen==="logout"} close={onClickClose} confirm={onClickClose} header="로그아웃">로그아웃 하셨습니다.</MessageModal>
        </MenuButton>
        
    );
}

export default SideMenu;