import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { TextField, Button, Typography, Paper, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.post('/user/login', {
        email,
        password,
      });

      console.log('Login Response:', response.data);

      // Save the token to localStorage
      localStorage.setItem('token', response.data.token);

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } catch (err) {
      console.error('Login Error:', err.response || err.message);

      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Something went wrong. Please try later.');
      }
    }
  };

  return (
    <Paper
      elevation={4}
      style={{
        maxWidth: 450,
        margin: '60px auto',
        padding: '30px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        borderRadius: '15px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: 'bold', color: '#1a237e' }}
      >
        Login
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          InputLabelProps={{
            style: { color: '#1a237e' },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          InputLabelProps={{
            style: { color: '#1a237e' },
          }}
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
          fullWidth
        >
          Login
        </Button>
      </form>
      {error && (
        <Alert severity="error" style={{ marginTop: '20px' }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          {success}
        </Alert>
      )}
    </Paper>
  );
};

export default Login;
