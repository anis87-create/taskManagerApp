import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from './redux/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user) || {};  
  const { user, token } = userState;
  useEffect(() => {

    if(token){
      dispatch(authMe());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        {/* Pages avec Navbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={
               <ProtectedRoute>
                 <Home />
               </ProtectedRoute>  
            } />
        </Route>
        {/* Pages sans Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
