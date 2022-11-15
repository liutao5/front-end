import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/user/Login'
import Registry from './pages/user/Registry'
import { setUserState } from './states/userState'
import { RootState } from './store'
import { get } from './utils/request'
import Music from './pages/music'
import Singer from './pages/music/singer'
import ErrorPage from './errorPage'
import Recommend from './pages/music/recommend'
import { Layout, Menu, Space } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import Artist from './pages/music/artist'

const { Header } = Layout

function IndexLayout() {
	const { isLogin, account } = useSelector((state: RootState) => state.userState)
	const menuItems = [{
		key: 'home',
		label: <Link to="/">HOME</Link>,
	}, {
		key: 'dashboard',
		label: <Link to="dashboard">DASHBOARD</Link>,
	}, {
		key: 'music',
		label: <Link to="music">MUSIC</Link>,
	}]
	return (
		<Layout style={{ height: '100%' }}>
			<Header style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 9 }}>
				<div style={{ color: '#ffffff' }}>logo</div>
				<Menu style={{ flexGrow: 1 }} mode="horizontal" items={menuItems} theme="dark"></Menu>
				<Space style={{ color: '#ffffff' }}>
					{isLogin ? <a>{account}</a> : <Link to="/login">LOGIN</Link>}
					<a href="https://github.com/liutao5/front-end" target="_blank" rel="noreferrer"><GithubOutlined /></a>
				</Space>
			</Header>
			<Layout>
				<Outlet />
			</Layout>
		</Layout>
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

	const router = createBrowserRouter([{
		path: '/',
		element: <IndexLayout />,
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
						element: <Recommend />
					}, {
						path: 'singer/:singerId',
						element: <Singer />
					}, {
						path: 'artist',
						element: <Artist />
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
	}])

	return (
		<RouterProvider router={router} />
	)
}
