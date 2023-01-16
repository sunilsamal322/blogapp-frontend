import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const Error = () => {

    const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className='container col-md-10 "'>
        <h2 className='text-center mt-5' style={{color:'red'}}>404 Page Not Found</h2>
        <h3 className="text-center my-3">The page you are looking for doesn't exist</h3>
        <div className='text-center mt-5'>
            <Link to={navigate(-1)} ><button className='btn btn-primary'>Go Back</button></Link>
        </div>
    </div>
    </>
  )
}

export default Error;
