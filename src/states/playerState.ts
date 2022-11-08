import { createSlice } from '@reduxjs/toolkit'

export const playerState = createSlice({
	name: 'player',
	initialState: {
		songId: 0
	},
	reducers: {
		setSongState: (state, params) => {
			const { songId } = params.payload
			console.log('songId', songId)
			state.songId = songId
		},
	}
})

export const { setSongState } = playerState.actions

export default playerState.reducer
