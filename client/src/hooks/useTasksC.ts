import { useContext } from 'react';
import { taskViewContext } from '../components/tasks/TasksView';

const useTasksC = () => useContext(taskViewContext);

export default useTasksC;
