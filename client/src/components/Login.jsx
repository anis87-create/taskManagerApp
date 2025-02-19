import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Authentication from './Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/userSlice'
const Login = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
        email:'',
        password:''
    });
  const navigate = useNavigate();
  const handleChange =(e) =>{
       setForm({...form,
        [e.target.name]: e.target.value
       });
  }  

  const onSubmit = (e) => {
    e.preventDefault();
    setForm({
      email:'',
      password:''
     });

     dispatch(login(form));

    console.log('isConnected',user.isConnected);
    
     if(user.isConnected=== true){
       navigate('/');
     }
     
  }


  return (
    <Authentication>
       <form onSubmit={onSubmit}>
          <div className="text-left"> 
                <label id='email'>E-mail *</label> <br />
                <input type='text' htmlFor="email" name='email' onChange={handleChange} value={form.email}  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2'/>
          </div>
          <div className="text-left mt-4"> 
                <label id='password'>Mot de Passe *</label> <br />
                <input type='password' htmlFor="password" name='password' onChange={handleChange} value={form.password}  className='border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none p-2'/>
          </div>
          <input type="submit" className='border-none bg-orange-500 w-100 text-white mt-5 p-4 font-bold rounded cursor-pointer' value='Se connecter' />
          <Link style={{textDecoration:'underline', marginTop:'8px', display:'block'}} to='/register'>Vous n'avez pas un compte ?</Link>
        </form> 
    </Authentication>
  )
}

export default Login
