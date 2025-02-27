import React, { useState } from 'react';
import Authentication from './Authentication';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null, // Use null for files
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      avatar: e.target.files[0], // Correctly updating the file
    });
  };

  const signup = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('password', form.password);
    
    if (form.avatar) {
      formData.append('avatar', form.avatar);
    }

    dispatch(register(formData));      
    navigate('/login');
  };

  return (
    <Authentication>
      <form onSubmit={signup}>
        <div className="text-left">
          <label htmlFor="email">E-mail</label> <br />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={form.email}
            className="border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none"
            style={{ marginBottom: '9px' }}
          />
        </div>

        <div className="text-left mt-4">
          <label htmlFor="username">Nom d'utilisateur</label> <br />
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={form.username}
            className="border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none"
            style={{ marginBottom: '9px' }}
          />
        </div>

        <div className="text-left mt-4">
          <label htmlFor="password">Mot de passe</label> <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            className="border-gray-300 border-2 w-100 p-3 mt-2 focus:border-orange-500 focus:outline-none"
            style={{ marginBottom: '9px' }}
          />
        </div>

        <div className="text-left mt-4">
          <label htmlFor="avatar">Image de profil</label> <br />
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="border-gray-300 border-2 w-100 p-3 mt-2"
            style={{ marginBottom: '9px' }}
          />
        </div>

        <input
          type="submit"
          className="border-none bg-orange-500 w-100 text-white mt-5 p-4 font-bold rounded cursor-pointer"
          value="Créer un compte"
        />
        <Link
          style={{ textDecoration: 'underline', marginTop: '8px', display: 'block' }}
          to="/login"
        >
          Vous avez déjà un compte ?
        </Link>
      </form>
    </Authentication>
  );
};

export default Register;
