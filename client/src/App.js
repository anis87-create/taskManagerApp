import './App.css';
import Login from './components/Login';
import {BrowserRouter, Route, Routes} from 'react-router';
import Register from './components/Register';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
