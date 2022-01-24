import React from 'react';
import { Box } from '@mui/material';
import { LoginForm } from 'src/components/users/login';

export default function Login(): JSX.Element {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box>
        <LoginForm />
      </Box>
    </Box>
  );
}
