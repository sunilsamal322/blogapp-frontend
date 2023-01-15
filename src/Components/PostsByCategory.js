import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPostsByCategories } from '../Services/category-service';
import Navbar from './Navbar';
import NewFeed from './NewFeed';

const PostsByCategory = () => {

    const {categoryId}=useParams();

    const [posts,setPosts] = useState([]);

    const [categoryTitle,setCateogoryTitle] =useState('');

    getPostsByCategories(categoryId)
    .then((data)=>{
        setPosts(data.content);
        if(posts.length>0){
            setCateogoryTitle(data.content[0].category.categoryTitle);
        }
    }).catch((error)=>{
    })
    

  return (
    <>
      <Navbar />
      {
        posts.length>0
        ?
        <div className="container mt-5 col-md-10 offset-md-1">
            <h3 className='text-center my-5'>Posts related to <span style={{color:'red'}}>{categoryTitle}</span></h3>
        {
            posts.map((post)=>{
                return <NewFeed post={post} key={post.id}/>
            })
        }
      </div>
      : 
      <div className='text-center mt-5'>
        <h1>No Posts</h1>
      </div>
      }
    </>
  )
}

export default PostsByCategory
