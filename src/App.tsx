import { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/user/Login'
import Registry from './pages/user/Registry'
import { setUserState } from './states/userState'
import { RootState } from './store'
import { get } from './utils/request'
import Github from './icons/github.svg'

function Menu() {
	const { isLogin, account } = useSelector((state: RootState) => state.userState)
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
							{isLogin ? <Nav style={{ color: '#FFFFFF' }}>{account}</Nav> : <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>}
							<a className="nav-link" href="https://github.com/liutao5/front-end"><Github /></a>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet />
		</>
	)
}

const getProfile = async () => await get('/user/profile')

export default function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		getProfile().then(res => {
			if (res.account) {
				dispatch(setUserState({ isLogin: true, account: res.account }))
			} else {
				dispatch(setUserState({ isLogin: false }))
			}
		}).catch(err => console.log(err))
	}, [])

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
		</div>
	)
}
