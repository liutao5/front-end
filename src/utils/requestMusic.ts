// const preUrl = 'http://124.221.175.44:3000'
const preUrl = 'http://124.221.175.44:3002'

interface Response {
	ok: boolean
	code: number
	errMsg: string
	access_token?: string
	message?: string
	account?: string
	[key: string]: any
}

async function request(url: string, options?: RequestInit): Promise<Response> {
	return await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		...options,
	}).then(async res => {
		return await res.json()
	}).catch(err => console.log(err))
}

export async function getMusic(url: string) {
	return await request(preUrl + url)
}

export async function postMusic(url: string, params: any) {
	return await request(preUrl + url, {
		method: 'POST',
		body: JSON.stringify(params)
	})
}
