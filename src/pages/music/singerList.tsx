import { useEffect, useState } from 'react'
import { Button, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import { getArtist } from './service'

interface Artist {
	id: number
	name: string
	picUrl: string
}

function SingerList() {
	const [artist, setArtist] = useState<Artist[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		getArtist().then(res => {
			console.log(res)
			setArtist(res.artists)
		})
	}, [])

	const viewSong = (id: number) => {
		navigate(`/music/singer/${id}`)
	}

	return (
		<>
			<ListGroup>
				{artist.map(item => (
					<ListGroupItem key={item.id}>
						<Image src={item.picUrl} width={100} height={100} />
						{item.name}
						<Button variant="link" onClick={() => viewSong(item.id)}>查看歌曲</Button >
					</ListGroupItem>
				))}
			</ListGroup>
		</>
	)
}

export default SingerList
