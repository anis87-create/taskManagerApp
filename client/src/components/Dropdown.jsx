import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { RiNotification4Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { logout } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom'
export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative inline-block">
      {/* Dropdown Button */}
      <div
        className="flex items-center justify-between bg-gray-200 w-24 h-12 rounded-full border border-gray-300 p-1 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Circular Button */}
        <div className="w-10 h-10 bg-gray-700 text-white flex items-center justify-center rounded-full text-sm font-bold">
          AZ
        </div>
        {/* Arrow Icon */}
        <div className={`ml-auto pr-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
          <svg className="w-4 h-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute p-4 right-1  mb-4 w-100 mr-30 bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
          <div className="p-4 flex border-gray-200 border-b-2 ">
              {user?.username}
          </div>  
          <div className="flex items-center p-2">
              <FaRegUser />
              <div className="ml-4 w-40 pl-3">Profil</div>
          </div>
          <div className="flex items-center p-2">
              <RiNotification4Line  />
              <div className="ml-4 w-40 pl-3">Notifications</div>
          </div>
          <div className="flex items-center p-2 cursor-pointer"
            onClick={() => {
                dispatch(logout());
                navigate('/login');
            }}
          >
              <AiOutlineLogout  />
              <div className="ml-4 w-40 pl-3"
              >Déconnexion</div>
          </div>  
   
        </div>
      )}
    </div>
  );
}
