/// <reference path="./DeleteButton.d.ts" />
import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deleteTask } from 'src/api/tasks';
import useTasksC from 'src/hooks/useTasksC';

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { updateTasks } = useTasksC();
  const delTask = async () => {
    if (window.confirm('are you sure you wnt to delete this task?')) {
      await deleteTask(id)
        .then(() => {
          updateTasks();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <IconButton onClick={delTask}>
      <Delete />
    </IconButton>
  );
}
