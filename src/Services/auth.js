//isLoggedIn
export const isLoggedIn = () =>{
    let data = localStorage.getItem("data");
    if(data!==null){
        return true;
    }else{
        return false;
    }
}


//doLogin set token to localsorage
export const doLogin = (data,next) =>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}


//doLogOut remove token from localsorage
export const doLogout = () =>{
    localStorage.removeItem("data");
    
}


//get current user
export const getCurrentUserDetails = () =>{
    if(isLoggedIn)
    {
        return JSON.parse(localStorage.getItem("data"))?.user;
    }else{
        return false;
    }
}