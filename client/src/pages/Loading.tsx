import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';

export default function Loading() {
  const theme: any = useTheme();
  return (
    <>
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
        <h1>Loading...</h1>
      </Box>
    </>
  );
}
