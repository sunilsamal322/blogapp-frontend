import React from 'react'
import { Outlet } from 'react-router-dom';
import { isLoggedIn } from '../../Services/auth';
import { Navigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';

const User = () => {
    return (
        <>
            <Navbar/>
            {isLoggedIn()===true ? <Outlet/> : <Navigate to='/login'/>}
        </>
    );
}

export default User;