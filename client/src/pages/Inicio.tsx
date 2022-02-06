import React from 'react';
import { Box, Typography } from '@mui/material';
import TaskViewS from 'src/components/tasks/TasksView';
import useAuth from 'src/hooks/useAuth';

export default function Inicio() {
  const { logged } = useAuth();
  return (
    <Box sx={{ paddingTop: '7%' }}>
      {!logged && (
        <Typography variant="h2">
          Inicia sesion o registrate para empezar
        </Typography>
      )}
      {logged && <TaskViewS />}
    </Box>
  );
}
