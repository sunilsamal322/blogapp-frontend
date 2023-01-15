import { myAxios } from "./Helper";

export const addPost = (postData) =>{
    return myAxios.post(`/posts/category/${postData.categoryId}`,postData,{
        headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
            'Content-Type':'application/json'
        }
    }).then((response)=>response.data);
}

export const getAllPosts = (pageNumber,pageSize) =>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=desc&sortBy=postAddedTime`).then((response)=>response.data);
}

export const getCurrentUserPosts = (pageNumber,pageSize) =>{
    return myAxios.get(`/posts/mypost?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=desc&sortBy=postAddedTime`,{
        headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
            'Content-Type':'application/json'
        }
    }).then((response)=>response.data);
}

export const getPostById = (id) =>{
    return myAxios.get(`/posts/${id}`).then((response)=>response.data);
}

export const deletePost = (postId) =>{
    return myAxios.delete(`/posts/${postId}`,{headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
        'Content-Type' : 'application/json'
    }}).then((response)=>response.data)
}

export const uploadPostImage = (image,postId) =>{

    let formData = new FormData();
    formData.append("image",image);
    
    return myAxios.post(`/posts/image/upload?postId=${postId}`,formData,{
        headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
            'Content-Type' : 'multipart/form-data'
        }
    }).then((response)=>response.data)
}

export const updatePost = (postId,postData) =>{
    return myAxios.put(`/posts/${postId}?categoryId=${postData.categoryId}`,postData,{
        headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
            'Content-Type' : 'application/json'
        }
    }).then((response)=>response.data)
}