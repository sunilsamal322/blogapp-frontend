import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import NewFeed from '../Components/NewFeed';
import { searchPost } from '../Services/post-service';

const Search = () => {

    const [posts,setPosts]  = useState([]);

    const [title,setTitle] = useState('');

    const searchPostHandler = (title) =>{
        searchPost(title).then((data)=>{
        setPosts([...data]);
        console.log(posts)
    }).catch((error)=>{
        console.log(error)
    })}

    const inputEvent = (event) =>{
        setTitle(event.target.value);
        searchPostHandler(title);
    }

  return (
    <>
    <Navbar />
    <div className="container mt-5 col-md-10 offset-md-1">
        <div className='text-center'>
            <input type="search" value={title} onChange={inputEvent} placeholder="Enter keyword" style={{padding:'5px'}}/>
        </div>
        {
            posts.length>0?
            posts.map((post)=>{
                return <NewFeed post={post} key={post.id}/>
                })
            :<>
            {
                title.length>=1?
                <div className='mt-5 text-center'>
                    <h2>No Post found with this keyword</h2>
                </div> :''
            }
            </>
        }
    </div>
    </>
  )
}

export default Search;