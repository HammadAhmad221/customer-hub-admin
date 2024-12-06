import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/SuperAdmin/Login';
import './index.css'
import RegistrationForm from './pages/SuperAdmin/Registration';
import Dashboard from './pages/SuperAdmin/Dashboard';
import CreateEditClient from './pages/SuperAdmin/ClientPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/client" element={<CreateEditClient />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
