import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const EditorContainer = styled.div`
  width: 560px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 30px;

  @media (max-width: 412px) {
    /* 412x915 해상도에서 보기 좋은 스타일 적용 */
    width: 100%;
    padding: 10px;
  }

  .ql-editor {
    height: 406px;
  }

  @media (max-width: 412px) {
    .ql-editor {
      height: 230px; /* 변경된 높이 설정 */
    }
  }
`;

const EditorTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #800634;
  margin-top: 20px;

  @media (max-width: 412px) {
    /* 412x915 해상도에서 보기 좋은 스타일 적용 */
    font-size: 20px;
  }
`;

const EditorWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 450px;

  @media (max-width: 412px) {
    /* 412x915 해상도에서 보기 좋은 스타일 적용 */
    height: 300px;
  }
`;

const MyEditor = ({ value, onChange }) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };
  const modules = {
    toolbar: [
      ['bold', 'italic', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
      ['clean']
    ],

  }

  return (
    <EditorContainer>
      <EditorTitle>내용 입력</EditorTitle>
      <EditorWrapper>
        <ReactQuill modules={modules} value={value} onChange={handleChange} />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default MyEditor;
