/// <reference path="./TaskItemCard.d.ts" />
import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  Checkbox
} from '@mui/material';
import EditTask from '../EditTask';
import { updateTask } from 'src/api/tasks';
import DeleteButton from '../DeleteButton';
import useTasksC from 'src/hooks/useTasksC';
import ReactMarkDown from 'react-markdown';

export default function TaskItemCard({ task }: TaskItemCardProps) {
  const { id, nombre, descripcion, done } = task;
  const { updateTasks } = useTasksC();
  const [msgE, setMsgE] = useState('');
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardHeader
          title={nombre}
          action={
            <>
              <DeleteButton id={id} />
              <EditTask task={task} />
              <Checkbox
                checked={Boolean(done)}
                onChange={(e) => {
                  const value: boolean = e.target.checked;
                  updateTask({ id, done: value, nombre, descripcion })
                    .then(() => {
                      updateTasks();
                    })
                    .catch((err) => {
                      if (err.isAxiosError) {
                        setMsgE(err.response.data.message);
                        setTimeout(() => setMsgE(''), 3500);
                      } else {
                        console.error(err);
                      }
                    });
                }}
              />
            </>
          }
        />
        <CardContent>
          <Box>
            <ReactMarkDown>{descripcion}</ReactMarkDown>
          </Box>
          {msgE}
        </CardContent>
      </Card>
    </Grid>
  );
}
