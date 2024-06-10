import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from '../components/CommentBoard.module.css';
import { ImReply } from "react-icons/im";
import axios from 'axios';

function CommentList({ postid }) {
    const [replyingTo, setReplyingTo] = useState();
    const [comments, setComments] = useState([]);

    useEffect(()=>{
      axios.post('http://154.12.55.105:8081/post/postComments', {postId: postContent.id}, {headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": auth,
      }}).then(response=>{
        if(response.data.code === 200){
          console.log(response.data.msg);
        }

      }).catch(error => {
        console.error('Error look post:', error);
      });

    }, []);
    const handleReply = (commentId) => {
      setReplyingTo(replyingTo === commentId ? null : commentId);
    };

    return (
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className={styles.commentContent}>
            <strong>{comment.user}</strong>: {comment.content} <ImReply  onClick={()=>handleReply(comment.id)}/>
           {replyingTo === comment.id && <CommentForm parentId={comment.id} />}
            {comment.replies && comment.replies.length > 0 && (
              <CommentList comments={comment.replies} />
            )}
          </li>
        ))}
      </ul>
    );
  }
  
  function CommentForm({ parentId = null }) {
    const [comment, setComment] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        postId: postid,
        comment: comment,
      };
      const auth = sessionStorage.getItem('token');
      axios.post('http://154.12.55.105:8081/comment/addComment', data,{
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": auth,
        })
      .then(response => {
        if (response.data.code === 200) {
          setComment('');
          setReplyingTo(null);
        } else {
          console.error('Failed to post comment');
        }
      })
      .catch(error => console.error('Error posting comment:', error));
    };
  
    return (
      <Form onSubmit={handleSubmit} className={styles.commentForm}>
        <Form.Control
            type="text"
            className={styles.comment}
            value={comment}
            as="textarea"
            rows={3}
            onChange={(event) => setComment(event.target.value)}
        />
        <div className={styles.button}>
        <Button variant="dark" type="submit">{parentId ? '답글 등록' : '댓글 등록'}</Button>
        </div>
      </Form>
    );
  }

const CommentBoard = ({comment, user}) => {
    const [userComment, setUserComment] = useState("");
    const currentUser = user;

    return (
        <div className={styles.commentWrapper}>
          <h2>댓글</h2>
          <CommentList comments={comment} />
          <CommentForm parentId={null}/>
        </div>
    );
};

export default CommentBoard;