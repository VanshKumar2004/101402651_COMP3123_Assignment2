import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
  Alert,
  Grid,
} from '@mui/material';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [error, setError] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({ department: '', position: '' });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await apiClient.get('/emp/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployees(response.data);
        setAllEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees.');
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = () => {
    const { department, position } = searchCriteria;
  
    if (!department && !position) {
      setEmployees(allEmployees); // Reset to all employees
      return;
    }
  
    const filteredEmployees = allEmployees.filter((employee) => {
      const matchesDepartment = department
        ? (employee.department || '').toLowerCase().includes(department.toLowerCase())
        : true;
      const matchesPosition = position
        ? (employee.position || '').toLowerCase().includes(position.toLowerCase())
        : true;
  
      return matchesDepartment && matchesPosition;
    });
  
    console.log('Filtered Employees:', filteredEmployees); 
    setEmployees(filteredEmployees);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear user session
    window.location.href = '/'; // Redirect to login page
  };

  const deleteEmployee = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first.');
        return;
      }

      await apiClient.delete(`/emp/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      alert('Employee deleted successfully');
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#1a237e' }}>
          Employee Management
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>

      {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}

      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Department"
            variant="outlined"
            name="department"
            fullWidth
            value={searchCriteria.department}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Position"
            variant="outlined"
            name="position"
            fullWidth
            value={searchCriteria.position}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
        <Button variant="outlined" color="secondary" fullWidth onClick={() => setEmployees(allEmployees)}>
          Clear Search
        </Button>

        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="success"
        onClick={() => (window.location.href = '/add-employee')}
        style={{ marginBottom: '20px' }}
      >
        Add Employee
      </Button>

      <TableContainer component={Paper} style={{ borderRadius: '15px', boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)' }}>
        <Table>
          <TableHead style={{ backgroundColor: '#e3f2fd' }}>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Position</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Department</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => (window.location.href = `/view-employee/${employee._id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => (window.location.href = `/update-employee/${employee._id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employees;
