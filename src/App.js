import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Customer from './components/Customer';
import Admin from './components/Admin';
import NoMatch from './components/NoMatch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoles, setCurrentRoles] = useState([]);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} onLogout={() => { localStorage.clear(); setIsLoggedIn(false) }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path='landing-page' element={<LandingPage currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} />} />
        <Route path='customer' element={<Customer currentRoles={currentRoles} />} />
        <Route path='admin' element={<Admin currentRoles={currentRoles} />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div >
  );
}

export default App;
