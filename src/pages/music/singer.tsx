import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlayerContext } from '.'
import { getArtSong, playMusic } from './service'

interface Song {
	name: string
	id: number
}

function Singer() {
	const { singerId } = useParams()
	const [songList, setSongList] = useState<Song[]>([])

	useEffect(() => {
		getArtSong(singerId).then(res => {
			if (res.code === 200) {
				setSongList(res.songs)
			}
		})
	}, [])

	const select = (player: HTMLAudioElement, songId: number) => {
		playMusic(songId).then(res => {
			console.log(res)
			player.src = res.data[0].url
		})
	}

	return (
		<PlayerContext.Consumer>
			{(player: HTMLAudioElement) => (
				<>
					<ul>
						{songList.map(song => (
							<li key={song.id} onClick={() => select(player, song.id)}>{song.name}</li>
						))}
					</ul>
				</>
			)}
		</PlayerContext.Consumer>
	)
}

export default Singer
