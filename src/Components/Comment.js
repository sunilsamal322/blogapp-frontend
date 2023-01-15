import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCurrentUserDetails } from '../Services/auth';
import { isLoggedIn } from '../Services/auth';

const Comment = (props) => {
  return (
    <>
        <div className='comment' key={props.comment.id}>
            <p className='name'><AccountCircleIcon/>{props.comment.user.firstName+' '+props.comment.user.lastName}</p>
            <p>{props.comment.content}</p>
            <p style={{color:'green'}}>{props.comment.commentTime}</p>
            {
              isLoggedIn()===true &&props.comment.user.id === getCurrentUserDetails().id
              ? <button className='btn btn-danger' onClick={()=>props.onDeleteCommentById(props.comment.id)}>Delete</button> : ''
            }
        </div>
    </>
  );
}

export default Comment;

