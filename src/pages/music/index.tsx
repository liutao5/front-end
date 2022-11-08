import { Affix, Button, Layout, Menu } from 'antd'
import { createContext, useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { anonimous, getArtist } from './service'

interface Artist {
	id: number
	name: string
	picUrl: string
}

const menuItem = [
	{
		key: 'recommend',
		label: '每日推荐',
	}, {
		key: 'singerList',
		label: '歌手',
	}
]

export const PlayerContext = createContext(new Audio())

function Music() {
	const navigate = useNavigate()
	const audioRef = useRef<HTMLAudioElement>(new Audio())
	const [songId, setSongId] = useState<number>()
	const [totalTime, setTotalTime] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)

	useEffect(() => {
		anonimous().then(res => console.log(res.cookie))
	}, [])

	useEffect(() => {
		audioRef.current.loop = true
		audioRef.current.addEventListener('canplay', e => {
			console.log('canpaly')
			console.log(audioRef.current.duration)
			setTotalTime(audioRef.current.duration)
		})
		audioRef.current.addEventListener('play', e => console.log(e))
		audioRef.current.addEventListener('timeupdate', e => {
			setCurrentTime(audioRef.current.currentTime)
		})
		return () => {
			console.log('leave')
		}
	}, [])

	const selectMenu = (menu: any) => {
		console.log(menu)
		navigate(`/music/${menu.key}`)
	}

	return (
		<PlayerContext.Provider value={audioRef.current}>
			<Layout style={{ height: '100vh' }}>
				<Layout.Sider>
					<Menu
						mode="vertical"
						items={menuItem}
						onClick={selectMenu}
					/>
				</Layout.Sider>
				<Layout.Content>
					<Outlet />
				</Layout.Content>
			</Layout>
			<div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'sticky', bottom: 0, background: '#FFFFFF' }}>
				<Button onClick={() => { audioRef.current.play() }}>play</Button>
				<Button onClick={() => audioRef.current.pause()}>stop</Button>
				{totalTime} / {currentTime}
			</div>
		</PlayerContext.Provider>
	)
}

export default Music
