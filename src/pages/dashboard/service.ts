import { getMusic } from '../../utils/requestMusic'

export async function anonimous() {
	return await getMusic('/register/anonimous')
}

export async function getArtist() {
	return await getMusic('/artist/list')
}
