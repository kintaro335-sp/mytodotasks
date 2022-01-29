import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { RegisterForm } from 'src/components/users/register';
import useAuth from 'src/hooks/useAuth';

export default function Register(): JSX.Element {
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
        <RegisterForm />
        {logged && <Navigate to="/" />}
      </Box>
    </Box>
  );
}
