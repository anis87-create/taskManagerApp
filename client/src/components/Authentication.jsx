import React from 'react'
import bgImage from '../assets/project-1.webp'
import { Link } from 'react-router'
const Authentication = ({children}) => {
  return (
    <div className='flex'>
      <div className="w-1/2  h-screen">
          <div className='text-center h-[64px]  border-b-2 border-gray-50 shadow-lg p-4'>
               <span className='text-2xl text-orange-500 font-bold'>AZ Task</span>
          </div>
          <div className='text-center mt-10  w-90 mx-auto'>
            <h2 className='font-bold text-2xl'>Bienvenue</h2>
            <p className='font-medium text-base mb-4'>Connexion ou création de compte</p>
            {children}
          </div>
      </div>
      <div className="w-1/2   h-screen bg-cover bg-center"
       style={{ backgroundImage: `url(${bgImage})` }}
      >
      </div>
    </div>
  )
}

export default Authentication;
