import React, { useEffect,useState } from 'react';
import { loadCommentsByPost,deleteComment } from '../Services/comment-service';
import { addComment } from '../Services/comment-service';
import {toast} from 'react-toastify';
import Comment from './Comment';
import { isLoggedIn } from '../Services/auth';

const CommentContainer = (props) =>{

      const [postComments,setPostComments] = useState([]);

      const [comment,setComment] = useState({
            content:''
      });

      const [error,setError] = useState('');

      const createComment = () =>{
        if(isLoggedIn()===false){
          toast.error("You need to login first");
          return;
        }
        addComment(props.postId,comment).then((data)=>{
            setComment({
              content:''
            })
            setPostComments([data,...postComments]);
        }).catch((error)=>{
          setError(error.response.data.content);
        })
      }

      const deleteCommentById = (id) =>{
        deleteComment(id).then(()=>{
          setPostComments(postComments.filter(comment => id!==comment.id));
        }).catch(()=>{
        })
      }

      useEffect(()=>{
        loadCommentsByPost(props.postId)
        .then((data)=>{
          setPostComments(data)
        }).catch((error)=>{
        })
      },[])
  
    return(
        <>
        <div className="container">
          <h3 className='ms-4'>Comments ({postComments.length})</h3>
          <div className='ms-5'>
            <div className='m-5'>
              <textarea cols='25' rows='2' style={{padding:'5px',resize:'none'}} value={comment.content} onChange={(event)=>{
                setComment({content:event.target.value});
                setError('');
                }} placeholder="Enter comment"/>
              <p style={{color:'red'}}>{error}</p> 
            <div>
              <button className='btn btn-outline-warning' onClick={createComment}>Add Comment</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ms-5">
              {
                postComments.map((comment)=>{
                  return(
                    <Comment comment={comment} key={comment.id} onDeleteCommentById={deleteCommentById}/>
                  )
                })
              }
            </div>
          </div>
         </div>
        </div>
    </>
    );
}

export default CommentContainer;