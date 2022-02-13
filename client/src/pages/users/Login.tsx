import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';
import { LoginForm } from 'src/components/users/login';
import useAuth from 'src/hooks/useAuth';

export default function Login(): JSX.Element {
  const { logged } = useAuth();
  const theme: any = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '7%',
        [theme.breakpoints.up('xs')]: { paddingTop: '15%' },
        [theme.breakpoints.up('sm')]: { paddingTop: '10%' },
        [theme.breakpoints.up('md')]: { paddingTop: '6%' },
        [theme.breakpoints.up('lg')]: { paddingTop: '5%' }
      }}
    >
      <Box>
        <LoginForm />
        {logged && <Navigate to="/" />}
      </Box>
    </Box>
  );
}
