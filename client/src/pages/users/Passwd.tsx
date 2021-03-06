import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';
import { PasswdForm } from '../../components/users/passwd';
import useAuth from '../../hooks/useAuth';

export default function Passwd() {
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
        [theme.breakpoints.up('lg')]: { paddingTop: '5%' },
      }}
    >
      <Box>
        <PasswdForm />
        {!logged && <Navigate to="/" />}
      </Box>
    </Box>
  );
}
