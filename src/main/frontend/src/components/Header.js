import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { MdHome, MdMenu, MdOutlineClose } from "react-icons/md";
import SideMenu from "./SideMenu";
import logo from "../images/logo-no-background.png";

const Container = styled.div`
  width: 100%;
  background-color: #990A2C;
  position: relative;
  height : 100px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  `

const LogoBox = styled.div`
  width: 300px;
  height: 100px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoImage = styled.img`
  width: 90%;
  height: 70%;
`;

const HomeImg = styled(MdHome)`
  width: 80px;
  height: 80px;
  position: absolute;
  color: white;
  @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`
const MenuBurger = styled(MdMenu)`
  width: 80px;
  height: 80px;
  position: absolute;
  color: white;

  @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        right: 8px;
        
    }
`
const OutLineClose = styled(MdOutlineClose)`
 width: 80px;
  height: 80px;
  position: absolute;
  color: white;

  @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        right: 8px;
        
    }
`
const HighlightCircle = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: none;
  transition: background-color 0.3s ease-in-out;
  @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

const HomeImgWrapper = styled.div`
  position: absolute;
  left: 16px;
  width: 80px;
  height: 80px;
  cursor: pointer;

  &:hover ${HighlightCircle} {
    background-color: rgba(255, 255, 255, 0.2);
  }
  @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

const MenuBurgerWrapper = styled.div`
  position: absolute;
  right: 16px;
  width: 80px;
  height: 80px;
  cursor: pointer;

  &:hover ${HighlightCircle} {
    background-color: rgba(255, 255, 255, 0.2);
  }
  @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;


const Header = ({children}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleIsOpen = (openOrClose) => {
    setIsOpen(openOrClose);
  };

    return(
        <Container>
          <HomeImgWrapper onClick={() => navigate("/")}>
            <HomeImg/>
            <HighlightCircle/>
          </HomeImgWrapper>
          {isMobile ? <>{children}</> : 
          <LogoBox>
            <LogoImage src={logo} alt="Logo" />
          </LogoBox>}   
          <MenuBurgerWrapper>
            {!isOpen ? <MenuBurger/> : <OutLineClose/>}
            <HighlightCircle/>
            <SideMenu handleIsOpen={handleIsOpen} isOpen={isOpen}/>
          </MenuBurgerWrapper>      
        </Container>
    );

}

export default Header;