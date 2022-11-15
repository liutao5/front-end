import { getMusic } from '../../utils/requestMusic'

// 游客登陆
export async function anonimous() {
	return await getMusic('/register/anonimous')
}

export async function getArtist(pageNumber: number, pageSize: number) {
	return await getMusic(`/artist/list?offset=${pageNumber}&limit=${pageSize}`)
}

export async function getArtSong(singerId: string) {
	return await getMusic(`/artist/songs?id=${singerId}`)
}

export async function playMusic(songId: string) {
	return await getMusic(`/song/url/v1?id=${songId}&level=exhigh`)
}

export async function getSongDetail(songId: string) {
	return await getMusic(`/song/detail?ids=${songId}`)
}

export async function getRecommendSongs() {
	return await getMusic('/recommend/songs')
}
