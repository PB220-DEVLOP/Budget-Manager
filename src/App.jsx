import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import CreateGroup from './pages/CreateGroup';
import ViewGroups from './pages/ViewGroup';
import GroupDetails from './pages/GroupDetails';  // Ensure this import is correct
import History from './components/History';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Home />} />
            <Route path="create-group" element={<PrivateRoute><CreateGroup /></PrivateRoute>} />
            <Route path="view-groups" element={<PrivateRoute><ViewGroups /></PrivateRoute>} />
            <Route path="groups/:groupId" element={<PrivateRoute><GroupDetails /></PrivateRoute>} />
            <Route path="/groups/:groupId/history" element={<PrivateRoute><History /></PrivateRoute>} />
            {/* Add more routes here as needed */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
