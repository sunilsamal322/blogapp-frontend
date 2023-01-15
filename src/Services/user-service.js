import { myAxios } from "./Helper";

export const signup = (user) =>{   
    return myAxios.post('/users/signup',user)
            .then((response)=>response.data);
}

export const login = (data) =>{
    return myAxios.post('/users/login',data)
            .then((response)=>response.data);
}

export const getUserDetailsById = (userId) =>{
    return myAxios.get(`/users/${userId}`,{headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
        'Content-Type':'application/json'
    }}).then((response)=>response.data)
}

export const updateUserDetails = (userId,userData) =>{
    return myAxios.put(`/users/${userId}`,userData,{headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
        'Content-Type':'application/json'
    }}).then((response=>response.data))
}

export const changePassword = (userId,password) =>{
    return myAxios.put(`/users/${userId}/change-password`,password,{headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('data')).token}`,
        'Content-Type':'application/json'
    }}).then((response)=>response.data)
}