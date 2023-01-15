import React, { useEffect, useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { Link,NavLink, useNavigate } from "react-router-dom";
import './Header.css';
import { isLoggedIn } from "../Services/auth";
import { getCurrentUserDetails } from "../Services/auth";
import { doLogout } from "../Services/auth";
import { getAllCategories } from "../Services/category-service";

const Header = () =>{

  const navigate = useNavigate();

  const [login,setLogin] = useState(false);
  const [user,setUser] = useState(undefined);
  const[category,setCateogory] = useState([]);

  useEffect(()=>{
    getCategories();
    setLogin(isLoggedIn);
    setUser(getCurrentUserDetails);
  },[login]);

  const getCategories = () =>{ 
    getAllCategories().then((data)=>{
      setCateogory(data);
    }).catch((error)=>{
      console.log(error);
    })
  }

  const logout= () =>{
    doLogout();
    navigate("/login");
  }

  return(
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-10 mx-auto">
            <nav className="navbar navbar-expand-lg">
            <div className="container-fluid ">
              <Link className="navbar-brand" to="/">Blog App</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-lg-0 me-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">New Feeds</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/service">Services</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About Us</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                  </li>
                  {
                    login?
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      USER ACTIONS
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/users/dashboard">DASHBOARD</Link></li>
                      <li><Link className="dropdown-item" to="/users/profile">PROFILE</Link></li>
                    </ul>
                  </li> : <></>
                  }
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Category
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to='/'>All</Link></li>
                      {
                        category.map((category,index)=>{
                          return <li key={index}><Link className="dropdown-item" to={`/category/${category.categoryId}`} >{category.categoryTitle}</Link></li>
                        })
                      }
                    </ul>
                  </li>
                </ul>

                <ul className="navbar-nav mb-lg-0 ms-auto">
                  {
                    login ? 
                    <>
                      <li className="nav-item">
                        <span className="nav-link">Hello, <span style={{color:'red',fontWeight:'bold'}}>{user.firstName}</span></span>
                      </li>
                      <li className="nav-item">
                        <span className="nav-link" onClick={logout} style={{cursor:'pointer'}}>LogOut</span>
                      </li>
                    </> 
                    : 
                    <>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                      </li>
                    </>
                  }
                  </ul>
                {/* <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    </>
  );
}

export default Header;