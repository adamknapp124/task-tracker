import React, { useEffect, useState, useCallback } from 'react';
import { useTasks } from './TaskContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Tasks() {
	const { tasks, setTasks } = useTasks();
	const [selectedTaskIds, setSelectedTaskIds] = useState([]);

	// Function to fetch tasks from the server
	const fetchTasks = useCallback(() => {
		fetch(
			'https://tcauo43b4haxkvrh4y4l2tukue0pbske.lambda-url.us-east-2.on.aws/api/tasks'
		)
			.then((response) => response.json())
			.then((data) => {
				console.log('Fetched tasks:', data);
				// Update the tasks in the shared state
				setTasks(data);
			})
			.catch((error) => {
				console.error('Error fetching tasks:', error);
			});
	}, [setTasks]);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const handleCheckboxChange = (taskId) => {
		// Toggle the selection state of the task
		if (selectedTaskIds.includes(taskId)) {
			setSelectedTaskIds((prevIds) => prevIds.filter((id) => id !== taskId));
		} else {
			setSelectedTaskIds((prevIds) => [...prevIds, taskId]);
		}

		// Log the taskId when the checkbox is checked
		console.log('Checkbox checked for taskId:', taskId);
	};

	const handleDeleteTask = (taskId) => {
		console.log('Deleting task with ID:', taskId); // Log the task ID
		// Send a DELETE request to the server with the task's ID
		fetch(
			`https://tcauo43b4haxkvrh4y4l2tukue0pbske.lambda-url.us-east-2.on.aws/api/deleteTask/${taskId}`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				// Handle the response from the server (if needed)
				console.log('Task deleted:', data);

				// Remove the deleted task from the local state
				setTasks((prevTasks) =>
					prevTasks.filter((task) => task.taskid !== taskId)
				);
				fetchTasks();
			})
			.catch((error) => {
				console.error('Error deleting task:', error);
			});
	};

	const handleDeleteSelectedTasks = () => {
		// Create an array of task IDs from the selectedTaskIds state
		const taskIds = selectedTaskIds;

		// Send the selected task IDs to the server for deletion
		fetch(
			'https://tcauo43b4haxkvrh4y4l2tukue0pbske.lambda-url.us-east-2.on.aws/api/deleteTasks',
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ taskIds }), // Send as a JSON array
			}
		)
			.then((response) => response.json())
			.then((result) => {
				// Handle the response from the server (if needed)
				console.log('Selected tasks deleted:', result);

				// Fetch the updated list of tasks after deleting selected tasks
				fetch(
					'https://tcauo43b4haxkvrh4y4l2tukue0pbske.lambda-url.us-east-2.on.aws/api/tasks'
				)
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
								onChange={() => handleCheckboxChange(task.task_id)}
								checked={selectedTaskIds.includes(task.task_id)}
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
								onClick={() => handleDeleteTask(task.task_id)}>
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
