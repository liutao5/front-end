import { get } from '../../utils/request'

export async function getProfile() {
	return await get('/user/profile')
}
