import React from 'react'
import { Link } from 'react-router'
import Authentication from './Authentication'
const Login = () => {
  return (
    <Authentication>
       <form>
          <div className="text-left"> 
                <label id='email'>E-mail *</label> <br />
                <input type='text' htmlFor="email"  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2'/>
          </div>
          <div className="text-left mt-4"> 
                <label id='password'>Mot de Passe *</label> <br />
                <input type='text' htmlFor="password"  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2'/>
          </div>
          <input type="submit" className='border-none bg-orange-500 w-100 text-white mt-5 p-4 font-bold rounded cursor-pointer' value='Se connecter' />
          <Link style={{textDecoration:'underline', marginTop:'8px', display:'block'}} to='/register'>Vous n'avez pas un compte ?</Link>
        </form> 
    </Authentication>
  )
}

export default Login
