import { useEffect } from 'react'
import { getRecommendSongs } from './service'

function Recommend() {
	useEffect(() => {
		getRecommendSongs().then(res => console.log(res))
	}, [])

	return (
		<>recommend</>
	)
}

export default Recommend
