import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { preUrl } from '../../utils/request'
import { RcFile } from './type'

interface Props {
	onChange: (res: { hash: string, filename: string }) => void
}

export default function Upload(props: Props) {
	const { onChange } = props
	const ref = useRef<HTMLInputElement>(null)

	const click = () => {
		ref.current?.click()
	}

	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files as unknown as RcFile[]
		const file = files[0]
		const formData = new FormData()
		formData.append('file', file)
		formData.append('filename', file.name)
		fetch(preUrl + '/file/upload', {
			method: 'POST',
			body: formData
		}).then(async res => {
			const str = await res.json()
			console.log(str)
			onChange(str)
		}).catch(err => console.log(err))
	}

	return (
		<div style={{ background: '#fff' }}>
			<input type="file" style={{ display: 'none' }} ref={ref} onChange={change} />
			<Button onClick={click}>上传文件</Button>
		</div>
	)
}
