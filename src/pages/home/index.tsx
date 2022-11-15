import { Button } from 'antd'
import styles from './index.module.less'

function Home() {
	return (
		<section className={styles.bg}>
			<div className={styles.container}>
				<Button>hello world</Button>
			</div>
		</section>
	)
}

export default Home
