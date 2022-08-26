import { Container, Nav, Navbar } from 'react-bootstrap'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'

function App() {
	return (
		<div>
			<Navbar bg="dark" fixed="top">
				<Container>
					<Navbar.Brand as={Link} to="/">
						H
					</Navbar.Brand>
					<Navbar.Collapse>
						<Nav>
							<Nav.Link as={Link} to="/">HOME</Nav.Link>
							<Nav.Link as={Link} to="/dashboard">DASHBOARD</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</div>
	)
}

export default App
