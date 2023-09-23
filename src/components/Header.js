import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
	return (
		<>
			{['md'].map((expand) => (
				<Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
					<Container fluid>
						<Navbar.Brand href="#">Personal Task Tracker</Navbar.Brand>
						<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end">
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									Offcanvas
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Nav.Link href="#action1">Home</Nav.Link>
									<NavDropdown
										title="Tasks"
										id={`offcanvasNavbarDropdown-expand-${expand}`}>
										<NavDropdown.Item href="#action3">
											Complete
										</NavDropdown.Item>
										<NavDropdown.Item href="#action4">
											Incomplete
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="#action5">
											Edit Tasks
										</NavDropdown.Item>
									</NavDropdown>
								</Nav>
								<Form className="d-flex">
									<Form.Control
										type="search"
										placeholder="Quick Add"
										className="me-2"
										aria-label="Search"
									/>
									<Button variant="outline-success">
										<FontAwesomeIcon icon={faPlus} />
									</Button>
								</Form>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
}

export default Header;
