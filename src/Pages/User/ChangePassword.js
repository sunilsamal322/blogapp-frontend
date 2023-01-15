import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { changePassword } from '../../Services/user-service';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doLogout } from '../../Services/auth';

const ChangePassword = () => {

    const {userId} = useParams();

    const navigate =useNavigate();

    const [password,setPassword] = useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    })

    const [error,setError] = useState({
        newPassword:'',
        confirmPassword:'',
        message:''
    })
    const inputEvent = (event) =>{
        const {name,value} = event.target;
        setPassword({...password,[name]:value})
        setError({
            newPassword:'',
            confirmPassword:'',
            message:''
        })
    }

    const passwordSubmit = (event) =>{
        event.preventDefault();
        if(password.newPassword!==password.confirmPassword){
            setError({...error,'confirmPassword':"Pasword didn't match"});
        }else{
            changePassword(userId,password).then((data)=>{
                toast.success("Password changed sucessfully");
                doLogout();
                navigate('/login');
            }).catch((error)=>{
                setError({...error.response.data})
            })
        }
    }

  return (
    <div className='container mt-5'>
        <Card className='col-md-6 offset-md-3'>
            <form className='form' onSubmit={passwordSubmit}>
                <legend className='text-center my-3'>Change password</legend>
                <div className='mb-3'>
                    <label htmlFor="old" className='form-label'>Old Password</label>
                    <input type="password" id='old' className='form-control' name='oldPassword' required placeholder='Enter old password' onChange={inputEvent}/>
                    <p style={{color:'red'}}>{error.message}</p>
                </div>
                <div className='mb-3'>
                    <label htmlFor="new" className='form-label'>New Password</label>
                    <input type="password" id='new' className='form-control' name='newPassword' required placeholder='Enter new password' onChange={inputEvent}/>
                    <p style={{color:'red'}}>{error.newPassword}</p>
                </div>
                <div className='mb-3'>
                    <label htmlFor="confirm" className='form-label'>Confirm Password</label>
                    <input type="password" id='confirm' className='form-control' name='confirmPassword' required placeholder='Re-enter new password' onChange={inputEvent}/>
                    <p style={{color:'red'}}>{error.confirmPassword}</p>
                </div>
                <div className='my-3 text-center'>
                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </div>
            </form>
        </Card>
    </div>
  )
}

export default ChangePassword;
