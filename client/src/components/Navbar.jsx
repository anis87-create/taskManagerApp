import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Dropdown from './Dropdown';

const Navbar = () => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();  // Assure-toi que useNavigate est bien utilisé ici

  const handleAddTask = () => {
    navigate('/ajouter-tache');  // Exemple de navigation vers une autre route
  };

  return (
    <div className="grid grid-cols-12 border-b-2 border-gray-50 shadow-lg h-20 flex items-center">
      <div className="col-span-1 p-4">
        <img src={logo} alt="logo" />
      </div>
      <div className="col-span-9 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold">👋 Bienvenu(e), {user?.username}</h2>
            <span>
              Vous avez <span className="text-orange-500">0</span> tâche active
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-2 p-1 pl-20">
        <Dropdown />
      </div>
    </div>
  );
};

export default Navbar;
