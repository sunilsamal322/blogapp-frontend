import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { getPostById, updatePost, uploadPostImage } from '../Services/post-service';
import { getAllCategories } from '../Services/category-service';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {

  const {postId} = useParams();

  const [post,setPost] = useState({
    title:'',
    content:'',
    categoryId:''
  });

  const [categories,setCategories] = useState([]);
  
  const [error,setError] = useState({});

  const editor =useRef(null);

  const [image,setImage] = useState(null);

  const handleFileChange = (event) =>{
      setImage(event.target.files[0]);
  }

  const inputEvent = (event) =>{
    const {name,value} = event.target;
    setPost({...post,[name]:value});
  }
  
  useEffect(()=>{
    getPostById(postId).then((data)=>{
    setPost({...data,categoryId:data.category.categoryId});
    }).catch((error)=>{
        toast.error("Error in loading post")
    })

    getAllCategories().then((data)=>{
      setCategories(data);
    }).catch((error)=>{
      console.log(error);
    })


  },[postId])


  const updatePostHandler = (event) =>{
    event.preventDefault();
    updatePost(postId,post)
    .then((data)=>{

      if(image!==null){
        uploadPostImage(image,postId).then((response)=>{
          console.log(response);
        }).catch((error)=>{
          console.log(error);
        })
      }
      toast.success("Post updated successfully");
    }).catch((error)=>{
      setError({...error.response.data})
      toast.error("Error in uploading the post");
    })
  }

  return (
    <>
      <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <legend className="text-center m-0">Edit Post</legend>
            <form className="form" onSubmit={updatePostHandler}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" required  value={post.title} onChange={inputEvent}/>
                <p style={{color:'red'}}>{error.title}</p> 
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <JoditEditor 
                ref={editor}  value={post.content} name="content" onChange={newContent => setPost({...post,content:newContent})}/>
                <p style={{color:'red'}}>{error.content}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Select post banner</label>
                <input type='file' className='form-control' id='image' accept='image/*' onChange={handleFileChange}/>
              </div> 
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select id="category" className='form-control' name="categoryId" defaultValue={post.categoryId} required onChange={inputEvent}>
                  <option disabled value={0}>Select Category</option>
                  {
                    categories.map((category)=>{
                        return <option value={category.categoryId} key={category.categoryId} selected={true?post.categoryId===category.categoryId : false} required>{category.categoryTitle}</option>
                    })
                  }    
                </select>
              </div>
              <div className="text-center mt-5">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type='reset' className='btn btn-danger ms-3'>Reset</button>
              </div>
            </form>
        </div> 
      </div>
    </div>
    </>
  )
}

export default UpdatePost;