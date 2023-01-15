import React from 'react'
import './NewFeed.css';
import {Link} from 'react-router-dom';
import { BASE_URL } from '../Services/Helper';
import img from '../images/default.jpg';

const NewFeed = (props) => {


  return (
      <>
      <Link to={'/posts/'+props.post.id}>
      <div className="card">
        <div className="row">
          <div className="col-md-8 col-8 ">
                <h3 className='title'>{props.post.title}...</h3>
                <p>Category : <strong style={{color:'red'}}>{props.post.category.categoryTitle}</strong></p>
                <p>Posted by <strong style={{color:'blue'}}>{props.post.user.firstName}</strong></p>
                <div className='d-flex flex-wrap'>
                  <p>Posted on : </p><p style={{color:'green'}}>{props.post.postAddedTime}</p>
                </div>
          </div>
          <div className="col-md-4 col-4">
          {
                props.post.postImageName==='default.jpg' 
                ?
                <img src={img} alt="img not available" className='img'/>
                :
                <img src={BASE_URL+`/posts/image/`+props.post.postImageName} alt="img not available" className='img'/>
              }
          </div>
        </div>
      </div>
    </Link>
    </>
  )
}
export default NewFeed;
