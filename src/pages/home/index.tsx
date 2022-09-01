import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import styles from './index.module.less'
import { getProfile } from './service'

function Home() {
	const query = () => {
		getProfile()
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		query()
	}, [])

	return (
		<section className={styles.bg}>
			<div className={styles.container}>
				<Button>hello world</Button>
			</div>
		</section>
	)
}

export default Home
