import React, { useState } from "react";
import './LoginSignup.css';
import { Link } from "react-router-dom";
import { signup } from "../Services/user-service";
import  { toast } from 'react-toastify';
import Navbar from "../Components/Navbar";

const Signup = () =>{

    const [user,setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    });

    const [error,setError] = useState({
            errors:{},
            emailMessage:'',
    })

    const inputEvent = (event) =>{
        const {value,name} = event.target;
        setUser((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
        setError({
            errors:{},
            emailMessage:''
        })
    }

    const submitForm = (event) =>{

        event.preventDefault();

        signup(user).then((response)=>{
            toast.success("Successfully Registered");
            setUser({
                firstName:'',
                lastName:'',
                email:'',
                password:''
            })
            setError({
                errors:{},
                emailMessage:''
            })
            
        }).catch((errorData)=>{
            setError({
                errors:errorData.response.data,
                emailMessage:errorData.response.data.message
            })
        })
    }

    return(
        <>
        <Navbar/>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <legend className="text-center m-0">Signup Here</legend>
                    <form className="form" onSubmit={submitForm}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName} onChange={inputEvent} style={error.errors.firstName ? {borderColor:'red'} : {color:'black'}} required placeholder="Enter first name"/>
                            <p className="error">{error.errors.firstName}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={inputEvent}
                            style={error.errors.lastName ? {borderColor:'red'} : {color:'black'}} required placeholder="Enter last name "/>
                            <p className="error">{error.errors.lastName}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailAddress" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailAddress" name="email" value={user.email} onChange={inputEvent}
                            style={error.emailMessage ? {borderColor:'red'} : {color:'black'}} required placeholder="Enter email"/>
                            <p className="error">{error.emailMessage}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={inputEvent} style={error.errors.password ? {borderColor:'red'} : {color:'black'}} required placeholder="Enter password"/>
                            <p className="error">{error.errors.password}</p>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Signup</button>
                            <p className="mt-3">Already registered? <Link to='/login'>LOGIN</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
export default Signup;