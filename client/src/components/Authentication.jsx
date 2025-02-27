import React from 'react'
import bgImage from '../assets/project-1.webp'
import { useSelector } from 'react-redux'

const Authentication = ({children}) => {

  return (
    <div className='flex'>
  <div id='first_div' className="w-1/2 h-screen">
    <div className='text-center h-[64px] border-b-2 border-gray-50 shadow-lg p-4'>
      <span className='text-2xl text-orange-500 font-bold'>AZ Task</span>
    </div>
    
    <div id='second_div' className='text-center w-full mx-auto mt-29  flex flex-col items-center justify-center'>

      <h2 className='font-bold text-2xl'>Bienvenue</h2>
      <p className='font-medium text-base mb-4'>Connexion ou création de compte</p>
      {/* Contenu dynamique */}
      {children}
    </div>
  </div>

  <div className="w-1/2 h-screen bg-cover bg-center"
       style={{ backgroundImage: `url(${bgImage})` }}>
  </div>
    </div>

  
  )
}

export default Authentication;
