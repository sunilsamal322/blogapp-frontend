import { myAxios } from "./Helper";

export const addComment = (postId,comment) =>{
    return myAxios.post(`/comments?postId=${postId}`,comment,{
        headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
            'Content-Type':'application/json'
        }
    }).then(response=>response.data);
}
export const loadCommentsByPost = (postId) =>{
    return myAxios.get(`/comments?postId=${postId}`).then(response=>response.data);
}

export const deleteComment = (id) =>{
    return myAxios.delete(`/comments/${id}`,{
        headers:{
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
            'Content-Type':'application/json'
        }
    }).then(response=>response.data);
}