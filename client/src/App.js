import './App.css';
import Login from './components/Login';
import {BrowserRouter, Route, Routes} from 'react-router';
import Register from './components/Register';
import Home from './components/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authMe } from './redux/userSlice';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(authMe());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
