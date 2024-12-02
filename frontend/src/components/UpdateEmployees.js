import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { TextField, Button, Typography, Paper, Alert, Grid } from '@mui/material';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams(); // Get employee ID from URL

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details.');
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in first.');
        return;
      }

      await apiClient.put(`/emp/employees/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Employee updated successfully!');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee.');
    }
  };

  return (
    <Paper
      elevation={4}
      style={{
        maxWidth: 700,
        margin: '50px auto',
        padding: '30px',
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        borderRadius: '15px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: 'bold', color: '#1a237e', textAlign: 'center' }}
      >
        Update Employee
      </Typography>
      {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
      {success && <Alert severity="success" style={{ marginBottom: '20px' }}>{success}</Alert>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={employee.first_name}
              onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={employee.last_name}
              onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
              required
            />
          </Grid>
        </Grid>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          required
        />
        <TextField
          label="Position"
          variant="outlined"
          fullWidth
          value={employee.position}
          onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
          required
        />
        <TextField
          label="Department"
          variant="outlined"
          fullWidth
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
          required
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#1a237e',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '30px',
          }}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateEmployee;
