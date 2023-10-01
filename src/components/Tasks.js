import React, { useEffect, useState } from 'react';
import { useTasks } from './TaskContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Tasks() {
	const { tasks, setTasks } = useTasks();
	const [selectedTaskIds, setSelectedTaskIds] = useState([]);

	useEffect(() => {
		// Fetch tasks from the server when the component mounts
		fetch(`http://localhost:3001/api/tasks`)
			.then((response) => response.json())
			.then((data) => {
				console.log('Fetched tasks:', data);
				// Update the tasks in the shared state
				setTasks(data);
			})
			.catch((error) => {
				console.error('Error fetching tasks:', error);
			});
	}, []);

	const handleCheckboxChange = (taskId) => {
		// Toggle the selection state of the task
		if (selectedTaskIds.includes(taskId)) {
			setSelectedTaskIds((prevIds) => prevIds.filter((id) => id !== taskId));
		} else {
			setSelectedTaskIds((prevIds) => [...prevIds, taskId]);
		}
	};

	const handleDeleteTask = (taskId) => {
		// Send a DELETE request to the server with the task's ID
		fetch(`http://localhost:3001/api/deleteTask/${taskId}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((result) => {
				// Handle the response from the server (if needed)
				console.log('Task deleted:', result);

				// Remove the deleted task from the local state
				setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
			})
			.catch((error) => {
				console.error('Error deleting task:', error);
			});
	};

	const handleDeleteSelectedTasks = () => {
		// Send the selected task IDs to the server for deletion
		fetch('http://localhost:3001/api/deleteTasks', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ taskIds: selectedTaskIds }),
		})
			.then((response) => response.json())
			.then((result) => {
				// Handle the response from the server (if needed)
				console.log('Selected tasks deleted:', result);

				// Fetch the updated list of tasks after deleting selected tasks
				fetch(`http://localhost:3001/api/tasks`)
					.then((response) => response.json())
					.then((data) => {
						console.log('Fetched tasks:', data);
						// Update the tasks in the shared state
						setTasks(data);
					})
					.catch((error) => {
						console.error('Error fetching tasks:', error);
					});

				// Clear the selected task IDs
				setSelectedTaskIds([]);
			})
			.catch((error) => {
				console.error('Error deleting selected tasks:', error);
			});
	};

	return (
		<Container className="mb-3">
			{tasks.map((task, index) => (
				<ul key={index}>
					<Row>
						<Col>
							<input
								type="checkbox"
								name="completed"
								onChange={() => handleCheckboxChange(task.id)}
								checked={selectedTaskIds.includes(task.id)}
							/>
						</Col>
						<Col>{task.task_type && task.task_type}</Col>
						<Col>{task.task_name}</Col>
						<Col>{task.task_description}</Col>
						<Col>
							{' '}
							<Button
								className=""
								variant="danger"
								type="submit"
								onClick={() => handleDeleteTask(task.id)}>
								Delete Task
							</Button>
						</Col>
					</Row>
				</ul>
			))}
			<Row>
				<Button
					className="w-25 m-auto mb-3"
					variant="danger"
					type="submit"
					onClick={handleDeleteSelectedTasks}>
					Delete Selected
				</Button>
			</Row>
		</Container>
	);
}

export default Tasks;
