import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router';


const Home = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/login');
  }
  return (
    <div>
       Home
       <button className='bg-red-200 cursor-pointer' onClick={onLogout}>logout</button>
    </div>
  )
}

export default Home
