/// <reference path="./CardView.d.ts" />
import React from 'react';
import { Grid } from '@mui/material';
import TaskItemCard from './TaskItemCard';
import AddTask from './AddTask';

export default function CardView({ tasks }: CardViewProps) {
  return (
    <>
      <Grid container spacing={3}>
        <AddTask />
        {tasks.map((task) => (
          <TaskItemCard key={task.id} task={task} />
        ))}
      </Grid>
    </>
  );
}
