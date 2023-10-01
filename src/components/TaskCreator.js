import React, { useState } from 'react';
import { useTasks } from './TaskContext';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function TaskCreator() {
	const { setTasks } = useTasks();
	// Sets the current state of the button selected
	const [selectedButtonValue, setSelectedButtonValue] = useState(null);
	const [taskName, setTaskName] = useState('');
	const [taskDescription, setTaskDescription] = useState('');

	// Array of buttons with corresponding values for task type
	const buttons = [
		{ label: 'Personal', value: 'personal' },
		{ label: 'Work', value: 'work' },
		{ label: 'Important', value: 'important' },
	];

	function handleChange(e) {
		const { name, value } = e.target;
		if (name === 'taskName') setTaskName(value);
		else if (name === 'taskDescription') setTaskDescription(value);
	}

	function fetchTasks() {
		fetch(`http://localhost:3001/api/tasks?_=${new Date().getTime()}`)
			.then((response) => response.json())
			.then((data) => {
				setTasks(data);
			})
			.catch((error) => {
				console.error('Error fetching tasks:', error);
			});
	}
	// CREATE A NEW TASK AND UPDATE TASKS DISPLAYED
	// CREATE A NEW TASK AND UPDATE TASKS DISPLAYED
	const handleCreateTask = () => {
		// Check if a task type is selected
		if (selectedButtonValue === null) {
			console.error('Task type must be selected');
			return;
		}

		// Prepare the task data
		const taskData = {
			taskName,
			taskDescription,
			taskType: buttons[selectedButtonValue].value, // Use the correct field name
		};

		// Clear the input fields immediately
		setTaskName('');
		setTaskDescription('');

		// Send the taskData to the server using a POST request
		fetch('http://localhost:3001/api/createTask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(taskData),
		})
			.then((response) => response.json())
			.then((result) => {
				// Handle the response from the server (if needed)
				console.log('Task created:', result);

				// Fetch the updated list of tasks after creating a new task
				fetchTasks();
			})
			.catch((error) => {
				console.error('Error creating task:', error);
			});
	};

	function handleDeleteTask(taskUniqueIdentifier) {
		// Send a DELETE request to the server with the unique identifier
		fetch(`http://localhost:3001/api/deleteTask/${taskUniqueIdentifier}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((result) => {
				// Handle the response from the server (if needed)
				console.log('Task deleted:', result);

				// Fetch the updated list of tasks after deleting a task
				fetchTasks();
			})
			.catch((error) => {
				console.error('Error deleting task:', error);
			});
	}

	return (
		<>
			<h1>Task Creator</h1>
			<Form className="w-50 m-auto">
				<FloatingLabel
					controlId="floatingInput"
					label="Task Name"
					className="mb-3">
					<Form.Control
						type="text"
						name="taskName"
						placeholder="Task Name"
						onChange={handleChange}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="floatingPassword" label="Task Description">
					<Form.Control
						className="mb-3"
						type="text"
						name="taskDescription"
						placeholder="Task Description"
						onChange={handleChange}
					/>
				</FloatingLabel>
				<ButtonGroup size="lg" className="mb-3 w-100">
					{buttons.map((button, index) => (
						<Button
							key={index}
							variant={
								selectedButtonValue === index ? 'primary' : 'outline-primary'
							}
							onClick={() => setSelectedButtonValue(index)}>
							{button.label}
						</Button>
					))}
				</ButtonGroup>
				<div className="mb-3">
					<Button
						className=""
						variant="primary"
						type="submit"
						onClick={(e) => handleCreateTask(e)}>
						Create Task
					</Button>
					<Button
						className=""
						variant="primary"
						type="submit"
						onClick={(e) => handleDeleteTask(e)}>
						Delete Task
					</Button>
				</div>
			</Form>
		</>
	);
}

export default TaskCreator;
