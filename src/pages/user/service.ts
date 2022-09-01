import { post } from '../../utils/request'

export async function registry(params: any) {
	return await post('/user', params)
}

export async function login(params: { account: string, password: string }) {
	return await post('/user/login', params)
}
