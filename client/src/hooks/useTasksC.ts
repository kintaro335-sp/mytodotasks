import { useContext } from 'react';
import { taskViewContext } from 'src/components/tasks/TasksView';

const useTasksC = () => useContext(taskViewContext);

export default useTasksC;
