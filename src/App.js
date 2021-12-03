import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Customer from './components/Customer';
import Admin from './components/Admin';
import Order from './components/Order';
import NoMatch from './components/NoMatch';
import ViewCustomer from './components/ViewCustomers'
import ViewOrders from './components/ViewOrders';
import Receipt from './components/Receipt';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoles, setCurrentRoles] = useState([]);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} onLogout={() => { localStorage.clear(); setIsLoggedIn(false) }} />
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path='/landing-page' element={<LandingPage currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/customer' element={<Customer currentRoles={currentRoles} />} />
        <Route path='/admin' element={<Admin currentRoles={currentRoles} />} />
        <Route path='/order' element={<Order />} />
        <Route path='*' element={<NoMatch />} />
        <Route path='/viewcustomer' element={<ViewCustomer />} />
        <Route path='/vieworders' element={<ViewOrders />} />
        <Route path='/receipt' element={<Receipt />} />
      </Routes>
    </div >
  );
}

export default App;
