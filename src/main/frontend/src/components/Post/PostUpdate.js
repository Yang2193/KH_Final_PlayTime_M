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

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 300px;
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

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await PostAPI.getPostById(postId);


        if (post) {
          setPostData({
            postTitle: post.postTitle || '',
            postImage: post.postImage || '',
            postContent: post.postContent || '',
          });
        } else {
          console.error('게시물을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('게시물 불러오기 에러:', error);
      }
    };

    fetchPost();
  }, [postId]);




  const handleImageChange = (image) => {
    setPostData((prevData) => ({
      ...prevData,
      postImage: image,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await PostAPI.updatePost(postId, postData);
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
        <div>
          <Label>
            이미지
            <ImageUploader onChange={handleImageChange} />
          </Label>
        </div>
        <div>
          <Label>
             <MyEditor  name="postContent"
              value={postData.postContent}
              onChange={handleInputChange}
              className="myTextarea"></MyEditor>
          </Label>
        </div>
        <Button onClick={handleUpdate}>수정하기</Button>
      </Container>
    </>
  );
};

export default PostUpdate;