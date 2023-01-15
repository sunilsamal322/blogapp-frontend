import React,{useEffect, useState} from "react";
// import { Link} from "react-router-dom";
import Navbar from "../Components/Navbar";
import NewFeed from '../Components/NewFeed';
import { getAllPosts } from "../Services/post-service";
import {toast} from 'react-toastify';
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () =>{

    const [posts,setPosts] = useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageNumber:'',
        pageSize:'',
        lastPage:false
    });

    const [currentPage,setCurrentPage] = useState(0);

    const changePage = (pageNumber=0,pageSize=3) =>{

        getAllPosts(pageNumber,pageSize).then((data)=>{
            setPosts({
                content:[...posts.content,...data.content],
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                pageNumber:data.pageNumber,
                pageSize:data.pageSize,
                lastPage:data.lastPage
            })
        }).catch((error)=>{
            toast.error("Error in loading data from server")
        });
    }

    useEffect(()=>{
        changePage(currentPage);
    },[currentPage])

    // const changePage = (pageNumber=0,pageSize=4) =>
    // {
    //     getAllPosts(pageNumber,pageSize).then((response)=>{
    //         setPosts(response);
    //     }).catch((error)=>{
    //         toast.error("Error in loading data from server")
    //     });   
    // }

    const changePageInfinite = () =>{
        setCurrentPage(currentPage+1);
    }

    return(
        <>
        <Navbar/>
        <div className="container mt-5 col-md-10 offset-md-1">
            <InfiniteScroll
                dataLength={posts.content.length}
                next = {changePageInfinite}
                hasMore={!posts.lastPage}
                loader={<h4 style={{color:'red'}}>Loading...</h4>}
            >

            {
                posts.content.map((post,index)=>{
                    return <NewFeed post={post} key={post.id} />
                })
            }

            </InfiniteScroll>
        </div>
        {/* {
            posts.content.length!==0 
            ?
            <div className="container">
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
        } */}
        </>
    );
}

export default Home;