import React, { useState, useEffect, createContext, useCallback } from 'react';
import {} from '@mui/material';
import { CardView } from './cardview';
import { getTasks } from 'src/api/tasks';

export const taskViewContext = createContext({ updateTasks: async () => {} });

export default function TaskViewSelector() {
  const [tasks, setTasks] = useState<any[]>([]);

  const getTasksF = useCallback(async () => {
    await getTasks()
      .then((resp) => {
        setTasks(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getTasksF();
  }, []);

  return (
    <>
      <taskViewContext.Provider value={{ updateTasks: getTasksF }}>
        <CardView tasks={tasks} />
      </taskViewContext.Provider>
    </>
  );
}
