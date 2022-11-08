import { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/user/Login'
import Registry from './pages/user/Registry'
import { setUserState } from './states/userState'
import { RootState } from './store'
import { get } from './utils/request'
import Github from './icons/github.svg'
import Music from './pages/music'
import Singer from './pages/music/singer'
import ErrorPage from './errorPage'
import Recommend from './pages/music/recommend'
import SingerList from './pages/music/singerList'

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
							<Nav.Link as={Link} to="/music">MUSIC</Nav.Link>
						</Nav>
						<Nav>
							{isLogin ? <Nav style={{ cursor: 'pointer' }}><span className="nav-link">{account}</span></Nav> : <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>}
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

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Menu />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <Home />
				}, {
					path: 'dashboard',
					element: <Dashboard />
				}, {
					path: 'music',
					element: <Music />,
					children: [
						{
							index: true,
							path: 'recommend',
							element: <Recommend />
						}, {
							path: 'singer/:singerId',
							element: <Singer />
						}, {
							path: 'singerList',
							element: <SingerList />
						}
					]
				}, {
					path: 'login',
					element: <Login />
				}, {
					path: 'registry',
					element: <Registry />
				}
			]
		}
	])

	return (
		<RouterProvider router={router} />
	)
}
