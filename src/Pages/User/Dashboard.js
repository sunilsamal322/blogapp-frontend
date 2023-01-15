import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import NewFeed from '../../Components/NewFeed';
import { getCurrentUserPosts } from '../../Services/post-service';
import {toast} from 'react-toastify';
import { isLoggedIn } from '../../Services/auth';


const Dashboard = () => {

  const navigate =useNavigate();

  const [posts,setPosts] = useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageNumber:'',
        pageSize:'',
        lastPage:false
  });

  const clickHandler = () =>{
    navigate("/users/addpost");
  }

  useEffect(()=>{
    if(isLoggedIn()===true){
    getCurrentUserPosts(0,4).then((response)=>{
        setPosts(response);
      }).catch((error)=>{
        toast.error("Error in loading data from server")
      });
    }else{
      navigate('/login');
    }
  },[])

  const changePage = (pageNumber=0,pageSize=4) =>
    {
        getCurrentUserPosts(pageNumber,pageSize).then((response)=>{
            setPosts(response);
        }).catch((error)=>{
          toast.error("Error in loading data from server")
        });   
    }

  return (
    <>
      <div className='text-center mt-5'>
        <button className='btn btn-primary' onClick={clickHandler}>Create Post +</button>
      </div>

        {
          posts.content.length>=1
          ?
          <div className='container mt-5'>
            <h4 style={{textDecoration:'underline'}}>My Posts ({posts.totalElements})</h4>
          </div>
          : 
          <h3 className='text-center mt-5'>No post</h3>
        }
       <div className="container mt-4">
        {
          posts.content.map((post)=>{
            return <NewFeed post={post} key={post.id}/>
          })
        }
      </div> 
      {
        posts.content.length!==0
        ?
        <div className="container mt-5 col-md-10 offset-md-1">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><span className="page-link">Pages</span></li>
                    {
                         [...Array(posts.totalPages)].map((item,index)=>{
                            return <li className="page-item" key={index}><Link className="page-link" onClick={()=>changePage(index)}>{index+1}</Link></li>
                        })
                    }
                </ul>
            </nav>
      </div>
      : ''
      }
    </>
  )
}

export default Dashboard;
