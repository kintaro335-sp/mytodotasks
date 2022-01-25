import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { LoginForm } from 'src/components/users/login';
import useAuth from 'src/hooks/useAuth';

export default function Login(): JSX.Element {
  const { logged } = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '7%'
      }}
    >
      <Box>
        <LoginForm />
        {logged && <Navigate to="/" />}
      </Box>
    </Box>
  );
}
