import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import styled from 'styled-components';
import PostAPI from '../api/PostApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cogIcon from '../images/free-icon-menu-2.png';
import RtMenu from '../components/Post/Report';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostReport from '../components/Post/PostReport ';


const Background = styled.div`
  background-color: #e2e2e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const PostDetailWrapper = styled.div`
  width: 65%;
  height: auto;
  min-height: 890px;
  margin: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  position: relative;
`;

const PostHeader = styled.div`
  margin-bottom: 20px;
`;

const PostTitle = styled.h2`
  font-size: 23px;
  margin-bottom: 30px;
  margin-right: auto;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #888;
  font-size: 14px;
  height: 48px;
  background-color: #f6f6f6;
  padding: 0 20px;
  border-radius: 5px;
`;

const PostInfoItem = styled.span`
  display: inline-block;
  margin-right: 10px;
  color: ${(props) => (props.userId ? '#000' : '#888')};
  font-weight: ${(props) => (props.userId ? 'bold' : 'normal')};
`;

const PostImage = styled.div`
  margin-bottom: 20px;
  img {
    width: 50%;
  }
`;

const PostContent = styled.div`
  line-height: 1.6;
  font-size: 17px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #888;
  margin-top: 40px;
`;

const CommentSection = styled.div`
  margin-top: 30px;
  height: ${(props) => props.height};
  transition: height 0.3s;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInput = styled.input`
  width: 88%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #990a2c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  max-height: 40px;
  width: 100px;
  font-size: 13px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-direction: ${(props) => (props.isAuthor ? 'row-reverse' : 'row')};
`;

const CommentContent = styled.div`
  position: relative;
  font-size: 12px;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const CommentBox =styled.div`
display: flex;
position: relative;
align-items: center;
justify-content:start;


`;
const CommentDate = styled.span`
  color: #888;
  position: relative;
  font-size: 11px;
  margin-right: 19px;
  left: 1%;
  margin-top: 2px;
`;


const CogImg = styled.div`
  display: ${(props) => (props.isAuthor ? 'block' : 'none')};
  position: absolute;
  right: 0;


  img {

    height: 13px;
    cursor: pointer;
  }
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #365899;
`;

const CommentMenu = styled.div`
  position: absolute;
  top: 10px;
  right: -120px;
  width: 120px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.show ? 'block' : 'none')};
  flex-direction: column;
  padding: 5px;
  border-radius: 5px;
  z-index: 999;
`;

const CommentMenuItem = styled.div`
  padding: 5px;
  cursor: pointer;
  color: #555;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const C1 = styled.div`
  margin-top: 18px;
`;

const PostD = styled.div`
  display:${(props) => (props.isAuthor ? 'block' : 'none')};
  position: absolute;
  right: 10px;
  button {
    background-color: white;
    color: black;
    position: relative;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;


  }
`;

const formatWriteDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formattedDate = new Date(date).toLocaleString('ko', options);
  return formattedDate;
};

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentSectionHeight, setCommentSectionHeight] = useState('auto');
  const [showCommentMenu, setShowCommentMenu] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState('');
  const [isCommentAuthor, setIsCommentAuthor] = useState(false);
  const [showRtMenu, setShowRtMenu] = useState(false);


  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const data = await PostAPI.getPostById(postId);
      setPost(data);
      increaseViews(postId);
      const comments = await PostAPI.getCommentsByPostId(postId);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };
  const imageUrls = post ? post.postImageUrl.split(',') : [];
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('게시물을 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        const response = await PostAPI.deletePost(postId);
        if (response.status === 200) {
          toast.error('게시물이 삭제되었습니다.');
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const increaseViews = async (postId) => {
    try {
      await PostAPI.increasePostViews(postId);
      setPost((prevPost) => ({ ...prevPost, postViews: prevPost.postViews + 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const newComment = {
        commentContent: comment,
        postId: postId,
        userId: localStorage.getItem('userId'),
      };

      const response = await PostAPI.createComment(newComment);
      if (response.status === 200) {
        console.log(response.data);
        fetchPost();
        setComment('');
      }

      console.log('작성된 댓글:', response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentMenu = (commentId) => {
    const loggedInUserId = localStorage.getItem('userId');
    const selectedComment = comments.find((comment) => comment.id === commentId);

    if (selectedComment && selectedComment.userId === loggedInUserId) {
      setSelectedCommentId(commentId);
      setIsCommentAuthor(true);
      setShowCommentMenu(!showCommentMenu);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const response = await PostAPI.deleteComment(selectedCommentId);
      if (response.status === 200) {
        toast.error('댓글이 삭제되었습니다');
        const updatedComments = comments.filter((comment) => comment.id !== selectedCommentId);
        setComments(updatedComments);
        setShowCommentMenu(false);
        setSelectedCommentId('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      const updatedCommentContent = prompt(
        '댓글을 수정하세요',
        comments.find((comment) => comment.id === selectedCommentId).commentContent
      );

      const response = await PostAPI.updateComment(selectedCommentId, updatedCommentContent);

      if (response.status === 200) {
        toast.success('댓글이 수정되었습니다.');
        console.log(response.data);
        const updatedComments = comments.map((comment) => {
          if (comment.id === selectedCommentId) {
            return {
              ...comment,
              commentContent: updatedCommentContent,
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setShowCommentMenu(false);
        setSelectedCommentId('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const commentSection = document.getElementById('commentSection');
    if (commentSection) {
      const sectionHeight = commentSection.scrollHeight + 'px';
      setCommentSectionHeight(sectionHeight);
    }
  }, [comments]);

  if (!post) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <Background>
        <PostDetailWrapper>
          <PostHeader>
            <PostTitle>{post.postTitle}</PostTitle>

            <PostInfo>
              <div>
                <PostInfoItem userId>작성자: {post.memberInfo ? post.memberInfo.userNickname : ''}</PostInfoItem>
                <PostInfoItem>{formatWriteDate(post.postDate)}</PostInfoItem>
              </div>
              <PostInfoItem>조회수: {post.postViews}</PostInfoItem>
            </PostInfo>
          </PostHeader>
          <PostImage>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={``} />
      ))}
    </PostImage>
          <PostContent className="Explaination2" dangerouslySetInnerHTML={{ __html: post.postContent }}></PostContent>
          <PostD isAuthor={post.memberInfo && post.memberInfo.userId === localStorage.getItem('userId')}>
            <button onClick={handleDeletePost}>게시물 삭제</button>
            <button onClick={() => navigate(`/postupdate/${post.id}`)}>게시물 수정</button>
          </PostD>
          {post.memberInfo.userId !== localStorage.getItem('userId') && (
              <PostReport postId={post.id} userId={post.userId} showRtMenu={showRtMenu} nickname={post.nickname} />
            )}
          <CommentSection id="commentSection" height={commentSectionHeight}>
            <CommentInputWrapper>
              <CommentInput
                type="text"
                placeholder="댓글을 입력하세요..."
                value={comment}
                onChange={handleCommentChange}
              />
              <CommentButton onClick={handleSubmitComment}>댓글 작성</CommentButton>
            </CommentInputWrapper>
            <CommentList>
              {comments.map((comment) => (
                <CommentItem key={comment.id} isAuthor={comment.userId === post.memberInfo.userId}>
                  <CommentContent isAuthor={comment.userId === post.memberInfo.userId}>
        <CommentBox>
            <CommentAuthor>{comment.nickname}</CommentAuthor>
            <CommentDate>{formatWriteDate(comment.commentDate)}</CommentDate>
          <CogImg isAuthor={comment.userId === localStorage.getItem('userId')}>
            <img
              src={cogIcon}
              alt="Cog Icon"
              onClick={() => handleCommentMenu(comment.id)}
            />
          </CogImg>
          {comment.userId !== localStorage.getItem('userId') && (
          <RtMenu postId={post.id} userId={comment.userId} commentId={comment.id} showRtMenu={showRtMenu} nickname={comment.nickname} />
        )}
        </CommentBox>

        <C1>{comment.commentContent}</C1>

        {comment.id === selectedCommentId && isCommentAuthor && (
          <CommentMenu show={showCommentMenu}>
            <CommentMenuItem onClick={handleDeleteComment}>삭제</CommentMenuItem>
            <CommentMenuItem onClick={handleUpdateComment}>수정</CommentMenuItem>
          </CommentMenu>
        )}
      </CommentContent>
    </CommentItem>
  ))}
</CommentList>
          </CommentSection>
        </PostDetailWrapper>
      </Background>
      <Footer />
    </>
  );
};

export default PostDetailPage;