import { createSlice } from '@reduxjs/toolkit'

export const userState = createSlice({
	name: 'user',
	initialState: {
		isLogin: false,
		account: '',
	},
	reducers: {
		setUserState: (state, params) => {
			const { isLogin, account } = params.payload
			state.isLogin = isLogin
			state.account = account
		},
	}
})

export const { setUserState } = userState.actions

export default userState.reducer
