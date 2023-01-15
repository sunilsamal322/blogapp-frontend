import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router-dom';
import { getUserDetailsById, updateUserDetails } from '../../Services/user-service';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UpdateProfile = () => {

    const {userId}=useParams();

    const [user,setUser] =useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        accountCreatedTime: '',
        roles: [],
        password:'Pass@1234'
    })
    const [error,setError] = useState({
        firstName:'',
        lastName:'',
        message:''
    });

    const inputEvent = (event) =>{
        const {name,value}=event.target;
        setUser({...user,[name]:value})
        setError({
            firstName:'',
            lastName:'',
            message:''
        })
    }

    const updateProfileHandler = (event) =>{
        event.preventDefault();
        setUser({...user})
        updateUserDetails(userId,user).then((data)=>{
            toast.success("Profile updated successfully")
            setError({
                firstName:'',
                lastName:'',
                message:''
            })
        }).catch((error)=>{
            setError({...error.response.data})
        })
    }
    
    useEffect(()=>{
        getUserDetailsById(userId).then((data)=>{
            setUser({...data,'password':'Pass@1234'})
        }).catch((error)=>{
            console.log(error);
        })
    },[userId])

  return (
    <div className='container mt-5'>
        <Card className='col-md-6 offset-md-3'>
            <div className='text-center'>
                <h6 className='mt-3'>USER INFORMATION</h6>
                <AccountCircleIcon style={{fontSize:'100px'}} className='mt-3'/>
            </div>
            <form className='form' onSubmit={updateProfileHandler}>
                <div className='mb-3'>
                    <label htmlFor="firstName" className='form-label'>First Name</label>
                    <input type="text" id='firstName' className='form-control' name='firstName' value={user.firstName} required onChange={inputEvent}/>
                    <p style={{color:'red'}}>{error.firstName}</p>
                </div>
                <div className='mb-3'>
                    <label htmlFor="lastName" className='form-label'>Last Name</label>
                    <input type="text" id='lastName' className='form-control' name='lastName' value={user.lastName} required onChange={inputEvent}/>
                    <p style={{color:'red'}}>{error.lastName}</p>
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>email</label>
                    <input type="email" id='email' className='form-control' name='email' value={user.email} required onChange={inputEvent}/>
                    <p style={{color:'red'}}>{error.message}</p>
                </div>
                <div className=' text-center'>
                    <Button variant='contained' color='primary' type='submit'>Save Profile</Button>
                    <Link to={`/users/changepassword/${user.id}`}><Button variant='contained' color='error' className='ms-3 my-3'>Change Password</Button></Link>
                </div>
            </form>
        </Card>
    </div>
  );
}

export default UpdateProfile;
