import React from 'react';
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { getCurrentUserDetails, isLoggedIn } from '../../Services/auth';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Profile = () => {

  const user=getCurrentUserDetails();

  return (
    <div className='container mt-5'>
      <Card className='col-md-6 offset-md-3 text-center'>
       {
        isLoggedIn()===true ?
        <>
           <h6 className='mt-3'>USER INFORMATION</h6>
        <AccountCircleIcon style={{fontSize:'100px'}} className='mt-3'/>
        <TableContainer >
        <Table>
          <TableBody>
            <TableRow >
              <TableCell align='center'>USER ID</TableCell>
              <TableCell align='center'>USER{user.id}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell align='center'>FIRST NAME</TableCell>
              <TableCell align='center'>{user.firstName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>LAST NAME</TableCell>
              <TableCell align='center'>{user.lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>EMAIL</TableCell>
              <TableCell align='center'>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>ROLE</TableCell>
              <TableCell align='center'>{user.roles[0].name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
        <div className='my-3'>
        <Link to={`/users/updateprofile/${user.id}`}><Button color='warning' variant='contained'>Update Profile</Button></Link>
        </div>
        </>
        : 
        <>
          <div className='text-center my-5'>
            <h2 className='my-3'>You need to Login first</h2>
            <Link to='/login'><Button variant='contained' color='primary'>Login</Button></Link>
          </div>
        </>
       }
      </Card>
    </div>
  )
}

export default Profile;
