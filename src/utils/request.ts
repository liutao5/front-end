// const preUrl = 'http://124.221.175.44:3000'
const preUrl = 'http://124.221.175.44:3001'

interface Response {
	ok: boolean
	code: string
	errMsg: string
	access_token?: string
	message?: string
	account?: string
}

async function request(url: string, options?: RequestInit): Promise<Response> {
	const accessToken = window.sessionStorage.getItem('access_token')
	return await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': accessToken ? `Bearer ${accessToken}` : ''
		},
		...options,
	}).then(async res => {
		return await res.json()
	}).catch(err => console.log(err))
}

export async function get(url: string) {
	return await request(preUrl + url)
}

export async function post(url: string, params: any) {
	return await request(preUrl + url, {
		method: 'POST',
		body: JSON.stringify(params)
	})
}
