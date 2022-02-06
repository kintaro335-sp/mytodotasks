/// <reference path="./TaskItemCard.d.ts" />
import React from 'react';
import { Grid, Card, CardHeader } from '@mui/material';

export default function TaskItemCard({ task }: TaskItemCardProps) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardHeader title={task.nombre} />
      </Card>
    </Grid>
  );
}
