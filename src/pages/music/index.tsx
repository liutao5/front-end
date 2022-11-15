import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import moment from 'moment'
import { createContext, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { anonimous, getArtist, getSongDetail, playMusic } from './service'

interface Artist {
	id: number
	name: string
	picUrl: string
}

interface SongDetailItem {
	name: string
	album: string
	artist: string[]
	url: string
}

export const PlayerContext = createContext(null)

function Music() {
	const audioRef = useRef<HTMLAudioElement>(new Audio())
	const [songId, setSongId] = useState<string>('')
	const [songDetail, setSongDetail] = useState<SongDetailItem>()
	const [totalTime, setTotalTime] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const [playing, setPlaying] = useState(false)

	const menuItem = [{
		key: 'recommend',
		label: <Link to="/music">今日推荐</Link>,
	}, {
		key: 'artist',
		label: <Link to="/music/artist">歌手</Link>,
	}]

	useEffect(() => {
		if (songId) {
			Promise.all([playMusic(songId), getSongDetail(songId)]).then(([urlRes, detailRes]) => {
				if (urlRes.code === 200 && detailRes.code === 200) {
					const url = urlRes.data[0].url
					const detail = detailRes.songs[0]
					const album = detail.al.name
					const name = detail.name
					const artist = detail.ar.map((item: any) => item.name)
					setSongDetail({
						name,
						album,
						artist,
						url
					})
					audioRef.current.src = url
				}
			})
		}
	}, [songId])

	useEffect(() => {
		audioRef.current.loop = true
		audioRef.current.autoplay = true
		audioRef.current.addEventListener('canplay', e => {
			setTotalTime(audioRef.current.duration)
		})
		audioRef.current.addEventListener('play', () => setPlaying(true))
		audioRef.current.addEventListener('pause', () => setPlaying(false))
		audioRef.current.addEventListener('timeupdate', e => {
			setCurrentTime(audioRef.current.currentTime)
		})

		return () => {
			console.log('leave')
			audioRef.current.pause()
		}
	}, [])

	useEffect(() => {
		console.log(currentTime.toFixed())
	}, [currentTime])

	return (
		<PlayerContext.Provider value={setSongId}>
			<Layout>
				<Layout.Sider theme="light">
					<Menu
						mode="vertical"
						items={menuItem}
					/>
				</Layout.Sider>
				<Layout.Content>
					<Outlet />
				</Layout.Content>
			</Layout>
			{songDetail && (
				<div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: 64, position: 'sticky', bottom: 0, background: '#999999', padding: '16px 24px' }}>
					<div style={{ display: 'flex', width: 200, justifyContent: 'space-around' }}>
						<p>{songDetail.name}</p>
						<p>{songDetail.artist.join('/')}</p>
					</div>
					<div style={{ position: 'relative', width: 300, padding: '8px 0px' }}>
						<div style={{ position: 'absolute', width: 300, height: 10, background: '#333333' }} />
						<div style={{ position: 'absolute', width: `${currentTime * 100 / totalTime}%`, height: 10, background: 'red' }} />
					</div>
					{playing
						? (
							<PauseOutlined style={{ fontSize: 32 }} onClick={() => audioRef.current.pause()} />
						)
						: (
							<CaretRightOutlined style={{ fontSize: 32 }} onClick={() => { audioRef.current.play() }} />
						)}
					<p>{moment(currentTime * 1000).format('mm:ss')} / {moment(totalTime * 1000).format('mm:ss')}</p>
				</div>
			)}
		</PlayerContext.Provider>
	)
}

export default Music
