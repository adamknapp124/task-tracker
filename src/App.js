import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskCreator from './components/TaskCreator';
import Tasks from './components/Tasks';
import { TaskProvider } from './components/TaskContext';

function App() {
	// const [selectedButtonValue, setSelectedButtonValue] = useState(null);
	// const [taskName, setTaskName] = useState('');
	const [tasks, setTasks] = useState([]);

	const addTask = (taskData) => {
		setTasks([...tasks, taskData]);
	};

	// const handleSelectedButton = (buttonValue) => {
	// 	setSelectedButtonValue(buttonValue);
	// };

	// const handleTaskNameChange = (newTaskName) => {
	// 	setTaskName(newTaskName);
	// };

	// const handleTaskCreate = (taskData) => {};
	return (
		<TaskProvider>
			<div className="App">
				<Header />
				<TaskCreator onTaskCreate={addTask} />
				<Tasks tasks={tasks} />
			</div>
		</TaskProvider>
	);
}

export default App;
