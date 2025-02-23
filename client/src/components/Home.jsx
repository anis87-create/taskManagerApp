import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


const Home = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

  return (
    <div>
  
    </div>
  )
}

export default Home
