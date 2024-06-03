import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Slots from './pages/Slots';
import Members from './pages/Members';
import Expenses from './pages/Expenses';
import Bill from './pages/Bill';

const PrivateRoute = ({ element }) => {
  const [user] = useAuthState(auth);
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slots" element={<PrivateRoute element={<Slots />} />} />
        <Route path="/members" element={<PrivateRoute element={<Members />} />} />
        <Route path="/expenses" element={<PrivateRoute element={<Expenses />} />} />
        <Route path="/bill" element={<PrivateRoute element={<Bill />} />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;
