import React, { useEffect, useRef, useState } from 'react'
import { getAllCategories } from '../Services/category-service';
import JoditEditor from 'jodit-react';
import { addPost, uploadPostImage } from '../Services/post-service';
import { toast } from 'react-toastify';

const AddPost = () => {

  const [categories,setCategories] = useState([]);

  const editor = useRef(null);

  const [post,setPost] = useState({
    title:'',
    content:'',
    categoryId:''
  })

  const [image,setImage] = useState(null);

  const handleFileChange = (event) =>{
    setImage(event.target.files[0]);
  } 

  const inputEvent = (event)=>{
      const {name,value} = event.target;
      setPost({...post,[name]:value});
      setError({});
  }
  const contentFieldChange = (data) =>{
      setPost({...post,'content':data});
      setError({});
  }
  const [error,setError] = useState({});

  const createPost = (event) =>{
      event.preventDefault();

      addPost(post).then((data)=>{

        uploadPostImage(image,data.id).then((data)=>{
          setImage(null);
        }).catch((error)=>{
          console.log(error)
          toast.error("Error in uploading image");
        })

        toast.success("Post added successfully");
        setPost({
          title:'',
          content:'',
          categoryId:post.categoryId
        })
      }).catch((error)=>{
        toast.error("Please choose category");
        setError({...error.response.data})
      })
  }

  useEffect(()=>{
    getAllCategories().then((data)=>{
      setCategories(data);
    }).catch((error)=>{
      console.log(error);
    })
  },[]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <legend className="text-center m-0">Create Post</legend>
            <form className="form" onSubmit={createPost}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" required  onChange={inputEvent} value={post.title}/>
                <p style={{color:'red'}}>{error.title}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <JoditEditor 
                ref={editor}  value={post.content} name="content" onChange={contentFieldChange}/>
                <p style={{color:'red'}}>{error.content}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Select post banner</label>
                <input type='file' className='form-control' id='image' onChange={handleFileChange} accept='image/*' required />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select id="category" className='form-control' name="categoryId" onChange={inputEvent} defaultValue={0} required>
                  <option disabled value={0}>Select Category</option>
                  {
                    categories.map((category)=>{
                        return <option value={category.categoryId} key={category.categoryId} required>{category.categoryTitle}</option>
                    })
                  }    
                </select>
              </div>
              <div className="text-center mt-5">
                <button type="submit" className="btn btn-primary">Add Post</button>
                <button type='reset' className='btn btn-danger ms-3'>Reset</button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddPost;
