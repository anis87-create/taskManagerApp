import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authMe } from './redux/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Pages avec Navbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        {/* Pages sans Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
