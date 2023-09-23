import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function BasicExample() {
	return (
		<Form className="w-50 m-auto">
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Task Name</Form.Label>
				<Form.Control type="email" placeholder="Name your task" />
			</Form.Group>
			<Form.Label className="w-100">Task Type</Form.Label>
			<ButtonGroup size="lg" className="mb-2">
				<Button>Personal</Button>
				<Button>Work</Button>
				<Button>Important</Button>
			</ButtonGroup>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Task Details</Form.Label>
				<Form.Control type="password" placeholder="Description" />
			</Form.Group>
			<Button variant="primary" type="submit">
				<FontAwesomeIcon icon={faPlus} />
				Create Task
			</Button>
		</Form>
	);
}

export default BasicExample;
