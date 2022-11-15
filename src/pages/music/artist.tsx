import { Image, List } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getArtist } from './service'

interface ArtItem {
	id: number
	name: string
	picUrl: string
}

function Artist() {
	const [artist, setArtist] = useState<ArtItem[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		queryArt()
	}, [])

	const viewSong = (id: number) => {
		navigate(`/music/singer/${id}`)
	}

	const queryArt = (pageNumber: number = 1, pageSize: number = 32) => {
		console.log(pageNumber, pageSize)
		getArtist((pageNumber - 1) * pageSize, 32).then(res => {
			console.log(res)
			setArtist(res.artists)
		})
	}

	return (
		<div style={{ padding: 32 }}>
			<List
				dataSource={artist}
				grid={{ gutter: 16, column: 8 }}
				renderItem={item => (
					<div style={{ textAlign: 'center' }} onClick={() => viewSong(item.id)}>
						<Image preview={false} src={item.picUrl} width={100} height={100} />
						<p>{item.name}</p>
					</div>
				)}
				size="large"
				pagination={{
					onChange: queryArt,
					pageSize: 32,
					total: 640,
				}}
			/>
		</div>
	)
}

export default Artist
