import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';  // Employee list component
import AddEmployee from './components/AddEmployees';  // Add employee form
import ViewEmployee from './components/ViewEmployees';  // View employee details
import UpdateEmployee from './components/UpdateEmployees';  // Update employee details
import Login from './components/Login';  // Login page
import Signup from './components/Signup';  // Signup page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/view-employee/:id" element={<ViewEmployee />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
