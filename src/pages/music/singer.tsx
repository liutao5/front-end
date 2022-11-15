import { CaretRightOutlined } from '@ant-design/icons'
import { Breadcrumb, Table } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PlayerContext } from '.'
import { getArtSong } from './service'

interface Song {
	name: string
	id: number
	album: string
}

function Singer() {
	const { singerId } = useParams()
	const navigate = useNavigate()
	const [songList, setSongList] = useState<Song[]>([])
	const setSongId = useContext(PlayerContext)

	useEffect(() => {
		if (singerId) {
			getArtSong(singerId).then(res => {
				if (res.code === 200) {
					console.log(res)
					setSongList(res.songs.map(item => ({
						name: item.name,
						id: item.id,
						album: item.al.name
					})))
				}
			})
		}
	}, [])

	const columns = [{
		title: '',
		width: 100,
		render: (value: any) => (
			<CaretRightOutlined onClick={() => setSongId(value.id)} />
		)
	}, {
		title: '歌曲名',
		dataIndex: 'name',
	}, {
		title: '专辑',
		dataIndex: 'album',
	}]

	return (
		<div style={{ padding: 32 }}>
			<Breadcrumb>
				<Breadcrumb.Item onClick={() => navigate('/music/artist')}><a>返回</a></Breadcrumb.Item>
			</Breadcrumb>
			<Table
				columns={columns}
				dataSource={songList}
				rowKey="id"
			/>
		</div>
	)
}

export default Singer
