import { Container, Nav, Navbar } from 'react-bootstrap'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/user/Login'
import Registry from './pages/user/Registry'

function Menu() {
	return (
		<>
			<Navbar bg="dark" sticky="top">
				<Container>
					<Navbar.Brand as={Link} to="/">
						LOGO
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar" />
					<Navbar.Collapse id="navbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Nav>
							<Nav.Link as={Link} to="/">HOME</Nav.Link>
							<Nav.Link as={Link} to="/dashboard">DASHBOARD</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet />
		</>
	)
}

export default function App() {
	return (
		<div>
			<Routes>
				<Route element={<Menu />}>
					<Route path='/' element={<Home />} />
					<Route path='/dashboard' element={<Dashboard />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/registry' element={<Registry />} />
			</Routes>
			<Outlet />
		</div>
	)
}
