import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './Post.css';
import { deletePost, getPostById } from '../Services/post-service';
import {toast} from 'react-toastify';
import { BASE_URL } from '../Services/Helper';
import CommentContainer from '../Components/CommentContainer';
import { getCurrentUserDetails, isLoggedIn } from '../Services/auth';
import img from '../images/default.jpg';
import { Link } from 'react-router-dom';

const Post = () => {

  const {postId}=useParams();

  const navigate =useNavigate();

  const [post,setPost]=useState({
      id: '',
      title:'',
      content:'',
      postAddedTime: '',
      postImageName: '',
      comments:[],
      user:{},
      category:{}
  });

  const deletePostHandler = () =>{
      deletePost(post.id).then(()=>{
        toast.success("post deleted successfuly");
        navigate("/");
      }).catch(()=>{
        toast.error("Something went wrong !")
      })
  }
      
  useEffect(()=>{
      getPostById(postId).then((data)=>{
        setPost(data)
      }).catch((error)=>{
        toast.error("Error in loading data");
      })
  },[postId])
  

  return (
    <>
      <Navbar/>
      {
        post.id!==''?
        <>
        <div className='container mt-4'>
          <div className="row">
            <div className="col-md-12">
                <div className='content-container'>
                  <h5>Posted on : <span style={{color:'green'}}>{post.postAddedTime}</span></h5>
                  <h5>Posted By : <span style={{color:'blue'}}>{post.user.firstName+ ' '+post.user.lastName}</span></h5>
                  <h5>Category : <span style={{color:'red'}}>{post.category.categoryTitle}</span></h5>
                </div>
                {
                  post.postImageName==='default.jpg'
                  ?
                  <div className='img-container'>
                    <img src={img} alt="img not available" />
                  </div>
                  :
                  <div className='img-container'>
                    <img src={BASE_URL+`/posts/image/`+post.postImageName} alt="img not available" />
                  </div>
                }
              <div className='content-container'>
                  <h1 style={{color:'navy'}}>{post.title}</h1>
                  <p dangerouslySetInnerHTML={{__html:post.content}} className='mt-5'></p>
              </div>
            </div>
          </div>  
        </div>
          <CommentContainer postId={post.id}/>:''
        {
          isLoggedIn()===true && post.user.id === getCurrentUserDetails().id
          ?
          <div className='text-center my-5'>
            <button className='btn btn-danger btn-large' onClick={deletePostHandler}>Delete Post</button>
            <Link to={`/users/updatepost/${post.id}`}><button className='ms-3 btn btn-warning btn-large'>Edit Post</button></Link>
          </div>
          : ''
        }
        </>
        :
        <>
          <div className='text-center mt-5'>
            <h1>No Post Found</h1>
          </div>
        </>
      }
    </>
  )
}

export default Post;
