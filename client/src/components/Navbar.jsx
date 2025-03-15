import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import Dropdown from './Dropdown';
import { RiNotification4Line } from "react-icons/ri";
import { FaRegMoon } from "react-icons/fa";
const Navbar = () => {
  const { user } = useSelector(state => state.user); 

  return (
    <div className="grid grid-cols-12 border-b-2 border-gray-50  h-20 flex items-center">
          <div className="col-span-1 p-4">
            <img src={logo} alt="logo" />
          </div>
          <div className="col-span-9 p-4">
            <div className="flex  items-center">
                <h2 className="font-bold">👋 Welcome, {user?.username}</h2>
            </div>
          </div>
      <div className="col-span-2 p-1 pl-20 flex items-center space-between">
         <FaRegMoon/>
        <div className='flex items-center' style={{marginLeft:'25px'}}>
          <RiNotification4Line  size={18}  />
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
