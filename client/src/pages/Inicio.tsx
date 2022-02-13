import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import TaskViewS from 'src/components/tasks/TasksView';
import useAuth from 'src/hooks/useAuth';

export default function Inicio() {
  const { logged } = useAuth();
  const theme: any = useTheme();

  return (
    <Box
      sx={{
        paddingTop: '7%',
        [theme.breakpoints.up('xs')]: { paddingTop: '15%' },
        [theme.breakpoints.up('sm')]: { paddingTop: '10%' },
        [theme.breakpoints.up('md')]: { paddingTop: '6%' },
        [theme.breakpoints.up('lg')]: { paddingTop: '5%' },
      }}
    >
      {!logged && (
        <Typography variant="h2">
          Inicia sesion o registrate para empezar
        </Typography>
      )}
      {logged && <TaskViewS />}
    </Box>
  );
}
