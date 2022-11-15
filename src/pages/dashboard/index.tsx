import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArtist } from './service'

function Dashboard() {
	const [result, setResult] = useState(0)
	const cal = (values: any) => {
		console.log(values)
		const { at } = values
		setResult(at * 2 * 1.466 * 0.9 * 0.51)
	}
	return (
		<>
			<Form onFinish={cal}>
				<Form.Item label="at" name="at">
					<Input></Input>
				</Form.Item>

				<Button htmlType="submit">计算</Button>
			</Form>
			{result}
		</>
	)
}

export default Dashboard
