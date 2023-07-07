import React, {useState} from "react";
import PostAPI from "../../api/PostApi";
import AccountApi from "../../api/AccountApi";

const MyComment = () => {
    const userId = localStorage.getItem('userId');
    const [commentList, setCommentList] = useState([]);
    const [postTitle, setPostTitle] = useState([]);

    const myCommentList = async() => {
        try {
            const response = await AccountApi.getMemberComment(userId);
            if(response && response.status === 200) {
                setCommentList(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    console.log(commentList);


    return (
        <>
        <button onClick={myCommentList}><h3>{userId}님의 댓글</h3></button>
        <table className="commentTable">
          <thead>
          </thead>
          <tbody>
            {commentList.map((cl) => (
              <tr className="commentItem" key={cl.id}>
                <td className="postId">{cl.postId}</td>
                <td className="">{cl.commentContent}</td>
                <td className="period">{cl.commentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
    )
};

export default MyComment;