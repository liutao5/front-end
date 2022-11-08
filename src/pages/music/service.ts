import { getMusic } from '../../utils/requestMusic'

// 游客登陆
export async function anonimous() {
	return await getMusic('/register/anonimous')
}

export async function getArtist() {
	return await getMusic('/artist/list')
}

export async function getArtSong(singerId: number) {
	return await getMusic(`/artist/songs?id=${singerId}`)
}

export async function playMusic(songId: number) {
	return await getMusic(`/song/url/v1?id=${songId}&level=exhigh`)
}

export async function getRecommendSongs() {
	return await getMusic('/recommend/songs')
}
