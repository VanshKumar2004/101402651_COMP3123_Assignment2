import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { Typography, Paper, CircularProgress, Alert, Grid } from '@mui/material';

const ViewEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
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

  return (
    <Paper
      elevation={4}
      style={{
        maxWidth: 600,
        margin: '50px auto',
        padding: '20px',
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        borderRadius: '15px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: 'bold', color: '#1a237e' }}
      >
        Employee Details
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {employee ? (
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              First Name:
            </Typography>
            <Typography>{employee.first_name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Last Name:
            </Typography>
            <Typography>{employee.last_name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Email:
            </Typography>
            <Typography>{employee.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Position:
            </Typography>
            <Typography>{employee.position}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Department:
            </Typography>
            <Typography>{employee.department}</Typography>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress style={{ marginTop: '20px' }} />
      )}
    </Paper>
  );
};

export default ViewEmployee;
