import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import CreateGroup from './pages/CreateGroup';
import ViewGroups from './pages/ViewGroups';
import GroupDetails from './pages/GroupDetails';
import HistoryOfExpenses from './pages/HistoryOfExpenses';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Home />} />
            <Route path="create-group" element={<CreateGroup />} />
            <Route path="view-groups" element={<ViewGroups />} />
            <Route path="groups/:groupId" element={<GroupDetails />} />
            <Route path="groups/:groupId/history" element={<HistoryOfExpenses />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
