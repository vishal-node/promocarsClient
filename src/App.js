import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
function App() {
  return (
    <Router>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/checkout/:id/:name/:price' element={<Checkout/>}/>

  </Routes>
    </Router>
  );
}

export default App;
