import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const PageNationBlock = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: larger;
  padding: 0;
  color: #990A2C;
  position: relative;
  top: 10%;

    .page-item{
    margin: 4px;
    color :#990A2C;
    border-radius: 5px;
    border : 2px solid #990A2C;
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .active{
    background-color: #990A2C;
    color: white;
    font-weight: bold;
    }

    .previous,
  .next {
    margin: 4px 10px;
    cursor: pointer;
  }
 

`;


const PageNation = ({pageCount, onPageChange}) => {

    return(
        <PageNationBlock
        previousLabel={'◀'}
        nextLabel={'▶'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        pageLinkClassName={'page-item'}
        activeLinkClassName={'active'}
        />
    );
}


export default PageNation;