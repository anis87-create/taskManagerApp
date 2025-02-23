import React, { useState } from 'react'
import Authentication from './Authentication'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { register } from '../redux/userSlice';

const Register = () => {
  const disptach = useDispatch();
  const [form, setForm] = useState({
      username:'',
      email:'',
      password:''
  });
  const navigate = useNavigate();
  const handleChange =(e) =>{
     setForm({...form,
      [e.target.name]: e.target.value
     });
  }    
  const signup = (e) => {
      e.preventDefault();
      disptach(register(form));
      setForm({
            username:'',
            email:'',
            password:''
      })
      navigate('/login');
  }
  return (
    <Authentication>
    <form onSubmit={signup}>
       <div className="text-left"> 
             <label id='email'>E-mail</label> <br />
             <input type='text' name='email' htmlFor="email" onChange={handleChange} value={form.email}  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2' style={{marginBottom:'9px'}}/>
       </div>
       <div className="text-left mt-4"> 
             <label id='username'>Nom d'utilisateur</label> <br />
             <input type='text' htmlFor="username" name='username' onChange={handleChange} value={form.username}  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2' style={{marginBottom:'9px'}}/>
       </div>
       <div className="text-left mt-4"> 
             <label id='password'>Mot de passe</label> <br />
             <input type='password' htmlFor="password" name='password' onChange={handleChange} value={form.password}  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2' style={{marginBottom:'9px'}}/>
       </div>
       <div className="text-left mt-4"> 
             <label id='avatar'>Image de profil</label> <br />
             <input type='file' htmlFor="avatar"  className='border-gray-300 border-2 w-100 p-3 mt-2' style={{marginBottom:'9px'}}/>
       </div>
       <input type="submit" className='border-none bg-orange-500 w-100 text-white mt-5 p-4 font-bold rounded cursor-pointer' value='Créer un compte' />
       <Link style={{textDecoration:'underline', marginTop:'8px', display:'block'}} to='/login'>Vous avez déja un compte ?</Link>

     </form> 
    </Authentication> 
  )
}

export default Register
