import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import User from './Pages/User/User';
import Profile from './Pages/User/Profile';
import Dashboard from './Pages/User/Dashboard';
import AddPost from './Components/AddPost';
import Post from './Pages/Post';
import  {ToastContainer} from 'react-toastify';
import PostsByCategory from './Components/PostsByCategory';
import UpdatePost from './Components/UpdatePost';
import UpdateProfile from './Pages/User/UpdateProfile';
import ChangePassword from './Pages/User/ChangePassword';
import Search from './Pages/Search';
import Error from './Pages/Error';

const App = () => {
  return (
    <>
      <ToastContainer position='bottom-center'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:categoryId' element={<PostsByCategory/>}/>
        <Route path='posts/:postId' element={<Post/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>} />
        <Route path='search' element={<Search/>} />
        <Route path='users' element={<User/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='addpost' element={<AddPost/>}/>
            <Route path='updatepost/:postId' element={<UpdatePost/>} />
            <Route path='updateprofile/:userId' element={<UpdateProfile/>}/>
            <Route path='changepassword/:userId' element={<ChangePassword/>}/>
        </Route>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </>
  );
}

export default App;
