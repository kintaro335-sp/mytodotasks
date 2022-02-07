import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { PasswdForm } from 'src/components/users/passwd';
import useAuth from 'src/hooks/useAuth';

export default function Passwd() {
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
        <PasswdForm />
        {!logged && <Navigate to="/" />}
      </Box>
    </Box>
  );
}
