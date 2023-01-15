import { myAxios } from "./Helper";

export const getAllCategories = () =>{
     return myAxios.get("/category").then((response)=>response.data);
}

export const getPostsByCategories = (categoryId) =>{
     return myAxios.get(`/posts/category/${categoryId}`).then(response=>response.data);
}