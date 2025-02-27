import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Authentication from './Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/userSlice'

const Login = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
        email:'',
        password:''
    });


  const handleChange =(e) =>{
       setForm({...form,
        [e.target.name]: e.target.value
       });
  }  

  const onSubmit = (e) => {
    e.preventDefault();
     dispatch(login(form));

  }
  useEffect(() => {
    if (user?.isConnected) {
      navigate('/'); // Redirection lorsque l'utilisateur est connecté
    }
  }, [user, navigate]); // Lorsque `user` change, on vérifie si l'utilisateur est connecté


  return (
    <Authentication>
       <form onSubmit={onSubmit}  method="POST">
          <div className="text-left"> 
                <label id='email'>E-mail *</label> <br />
                <input type='text' htmlFor="email" name='email' onChange={handleChange} value={form.email}  className='border-gray-300 border-2 w-100 mb-10  focus:border-orange-500 focus:outline-none p-2' style={{marginBottom:'9px'}}/>
          </div>
          <div className="text-left mt-4"> 
                <label id='password'>Mot de Passe *</label> <br />
                <input type='password' htmlFor="password" name='password' onChange={handleChange} value={form.password}  className='border-gray-300 border-2 w-100 p-3  focus:border-orange-500 focus:outline-none p-2' style={{marginBottom:'9px'}}/>
          </div>
          <input type="submit" className='border-none bg-orange-500 w-100 text-white mt-5 mb-5 p-4 font-bold rounded cursor-pointer' value='Se connecter' />
          <Link style={{textDecoration:'underline', marginTop:'8px', display:'block'}} to='/register'>Vous n'avez pas un compte ?</Link>
        </form> 
    </Authentication>
  )
}

export default Login
