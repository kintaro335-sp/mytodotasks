/// <reference path="./CardView.d.ts" />
import React from 'react';
import { Grid } from '@mui/material';
import TaskItemCard from './TaskItemCard';

export default function CardView({ tasks }: CardViewProps) {
  return (
    <>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <TaskItemCard key={task.id} task={task} />
        ))}
      </Grid>
    </>
  );
}
