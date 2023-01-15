import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginSignup.css';
import { login } from "../Services/user-service";
import { doLogin } from "../Services/auth";
import Navbar from "../Components/Navbar";

const Login = () =>{

    
    const [data,setData] =useState({
        email:'',
        password:''
    });

    const navigate =useNavigate();

    const [error,setError] = useState("");

    const inputEvent = (event) =>{
        
        const {value,name} = event.target;
        setData((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        });
        setError("");
    }

    const submitHandler = (event)=>{
        event.preventDefault();

        login(data).then((jwtToken)=>{
            doLogin(jwtToken,()=>{})
            setError('');
            setData({
                email:'',
                password:''
            });
            navigate("/");
        }).catch((erroData)=>{
            setError(erroData.response.data.message);
        })
    }
    return(
        <>
        <Navbar/>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <legend className="text-center m-0">Login Here</legend>
                    <form className="form" onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={data.email} onChange={inputEvent} required placeholder="Enter email"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={data.password} onChange={inputEvent} required placeholder="Enter password"/>
                            <p className="error">{error?"Invalid email or password" : ''}</p>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <p className="mt-3">Not registered? <Link to='/signup'>SIGNUP</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;