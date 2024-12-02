import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig'; // Ensure this is the correct path to your Axios instance
import { TextField, Button, Typography, Paper, Alert } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
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
      const response = await apiClient.post('/user/signup', {
        username,
        email,
        password,
      });

      console.log('Signup Response:', response.data);
      setSuccess('Signup successful! Please log in.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Signup Error:', err.response || err.message);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: 400,
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Signup
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
          Signup
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

export default Signup;
