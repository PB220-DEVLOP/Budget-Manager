import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Slots from './pages/Slots';
import Members from './pages/Members';
import Expenses from './pages/Expenses';
import Bill from './pages/Bill';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/members" element={<Members />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
