import React, {useState} from "react";
import PostAPI from "../../api/PostApi";
import AccountApi from "../../api/AccountApi";
import { useEffect } from "react";

const MyComment = () => {
    const userId = localStorage.getItem('userId');
    const [commentList, setCommentList] = useState([]);
    const [postTitle, setPostTitle] = useState([]);

    useEffect(() => {
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
      myCommentList();
    }, [])
    


    return (
        <>
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