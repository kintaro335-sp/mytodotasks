/// <reference path="../../api/tasks.d.ts" />
import React, { useState, useEffect } from 'react';
import {} from '@mui/material';
import { CardView } from './cardview';
import { getTasks } from 'src/api/tasks';

export default function TaskViewSelector() {
  const [tasks, setTasks] = useState<taskT[]>([]);

  useEffect(() => {
    async function getTasksF() {
      await getTasks().then((resp) => {
        setTasks(resp.data);
      });
    }
    getTasksF();
  }, []);

  return (
    <>
      <CardView tasks={tasks} />
    </>
  );
}
