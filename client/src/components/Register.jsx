import React from 'react'
import Authentication from './Authentication'
import { Link } from 'react-router'

const Register = () => {
  return (
    <Authentication>
    <form>
       <div className="text-left"> 
             <label id='email'>E-mail</label> <br />
             <input type='text' htmlFor="email"  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2'/>
       </div>
       <div className="text-left mt-4"> 
             <label id='username'>Nom d'utilisateur</label> <br />
             <input type='text' htmlFor="username"  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2'/>
       </div>
       <div className="text-left mt-4"> 
             <label id='password'>Mot de passe</label> <br />
             <input type='password' htmlFor="password"  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2'/>
       </div>
       <div className="text-left mt-4"> 
             <label id='avatar'>Image de profil</label> <br />
             <input type='file' htmlFor="avatar"  className='border-gray-300 border-2 w-100 p-3 mt-2'/>
       </div>
       <input type="submit" className='border-none bg-orange-500 w-100 text-white mt-5 p-4 font-bold rounded cursor-pointer' value='Créer un compte' />
       <Link style={{textDecoration:'underline', marginTop:'8px', display:'block'}} to='/login'>Vous avez déja un compte ?</Link>

     </form> 
    </Authentication> 
  )
}

export default Register
