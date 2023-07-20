import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import PostAPI from '../../api/PostApi';
import { toast, ToastContainer } from 'react-toastify';


const CommentMenu = styled.div`
  position: absolute;
  top: 560px;
  right: 140px;
  width: 220px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: ${props => (props.show ? 'block' : 'none')};
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  z-index: 999;
  @media (max-width: 412px) {
   left: 90px;
    top: 380px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ReportForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ReportInput = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const ReportButton = styled.button`
  padding: 5px 10px;
  background-color: #990A2C;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ExampleItem = styled.div`
  padding: 5px;
  cursor: pointer;
  color: #555;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const T1 = styled.div`
  color: red;
  width: 110px;
  font-size: 12px;
  position: relative;
  cursor: pointer;
  margin-bottom: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: auto;
  @media (max-width: 412px) {
    width: 80px;
    font-size: 10px;
  }
`;

const PostReport  = ({ commentId, nickname, userId,postId }) => {
  const [showRtMenu, setShowRtMenu] = useState(false);
  const [reportReason, setReportReason] = useState('');



  const handleReport = async (commentId, reportReason, nickname, postId, reportUserId) => {
    try {
      const response = await PostAPI.reportComment(
        commentId,
        reportReason,
        nickname,
        postId,
        reportUserId
      );
      console.log('Report:', response.data);
      toast.success('신고가 접수 되었습니다');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRtMenu = () => {
    setShowRtMenu(!showRtMenu);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    handleReport(commentId, reportReason, nickname, postId, userId);

    setShowRtMenu(false);
    setReportReason('');
  };

  const handleInputChange = e => {
    setReportReason(e.target.value);
  };

  const handleExampleClick = example => {
    setReportReason(example);
  };

  return (
    <>
      <T1  onClick={toggleRtMenu}>※게시물 신고하기※</T1>

      <CommentMenu show={showRtMenu}>
        <Title>게시물 신고하기</Title>
        <ReportForm onSubmit={handleSubmit}>
          <ReportInput
            type="text"
            placeholder="신고 사유를 입력해주세요"
            value={reportReason}
            onChange={handleInputChange}
          />
          <Title>신고 예시</Title>
          <ExampleItem onClick={() => handleExampleClick('욕설 및 혐오 표현 사용')}>
            욕설 및 혐오 표현 사용
          </ExampleItem>
          <ExampleItem onClick={() => handleExampleClick('스팸 또는 광고')}>
            스팸 또는 광고
          </ExampleItem>
          <ExampleItem onClick={() => handleExampleClick('폭력적인 콘텐츠')}>
            폭력적인 콘텐츠
          </ExampleItem>
          <ExampleItem onClick={() => handleExampleClick('개인정보 유출')}>
            개인정보 유출
          </ExampleItem>
          <ReportButton type="submit">신고</ReportButton>
        </ReportForm>
      </CommentMenu>
    </>
  );
};

export default PostReport ;
