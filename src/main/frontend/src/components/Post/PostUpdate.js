// PostUpdate 컴포넌트 수정

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import PostAPI from '../../api/PostApi';
import MyEditor from './TextQuill';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const ImageUploaderImg = styled.div`
  img {
    width: 40%;
  }
`;



const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #800634;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

const PostUpdate = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({
    postTitle: '',
    postImage: '',
    postContent: '',
  });
  const [previousImages, setPreviousImages] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await PostAPI.getPostById(postId);

        if (post) {
          setPostData({
            postTitle: post.postTitle || '',
            postImage: post.postImageUrl || '',
            postContent: post.postContent || '',
          });

          // 기존 이미지들을 배열로 변환하여 저장
          const imageUrls = post.postImageUrl ? post.postImageUrl.split(',') : [];
          setPreviousImages(imageUrls);
        } else {
          console.error('게시물을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('게시물 불러오기 에러:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleImageChange = (images) => {
    setPostData((prevData) => ({
      ...prevData,
      postImage: images.join(','), // 여러 이미지 URL을 쉼표로 구분하여 문자열로 만듦
    }));

    // 이미지가 변경되면 이전 이미지들 초기화
    if (images.length > 0) {
      setPreviousImages([]);
    } else {
      setPreviousImages(previousImages);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setPostData((prevData) => ({
      ...prevData,
      postContent: content,
    }));
  };

  const handleUpdate = async () => {
    try {
      // 이미지 URL을 포함한 게시물 데이터를 생성
      const updatedPostData = {
        ...postData,
        postImageUrl: postData.postImage,
      };

      const response = await PostAPI.updatePost(postId, updatedPostData);
      if (response) {
        toast.success('게시물 수정 성공');
        navigate(-1);
      } else {
        toast.error('게시물 수정 실패');
      }
    } catch (error) {
      console.error('게시물 수정 에러:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Heading>게시물 수정</Heading>

        <div>
          <Label>
            제목
            <Input
              type="text"
              name="postTitle"
              value={postData.postTitle}
              onChange={handleInputChange}
            />
          </Label>
        </div>

        <ImageUploaderImg>
        이미지
          <ImageUploader onChange={handleImageChange} />
          {previousImages.map((imageUrl, index) => (
            <div key={index} className="Img1">
              <img src={imageUrl} alt={`기존 이미지 ${index + 1}`} />
            </div>
          ))}
        </ImageUploaderImg>

        <div>
          <Label>
            내용
            <MyEditor
              name="postContent"
              value={postData.postContent}
              onChange={handleEditorChange}
              className="myTextarea"
            />
          </Label>
        </div>

        <Button onClick={handleUpdate}>수정하기</Button>
      </Container>
    </>
  );
};
//
export default PostUpdate;
