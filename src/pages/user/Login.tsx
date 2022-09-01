import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import { login } from './service'

function Login() {
	const [account, setAccount] = useState<string>()
	const [password, setPassword] = useState<string>()
	const [validated, setValidated] = useState(false)
	const navigate = useNavigate()

	const back = () => navigate('/')

	const toRegistry = () => navigate('/registry')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget
		if (form.checkValidity()) {
			login({
				account: account ?? '',
				password: password ?? ''
			}).then(res => {
				console.log(res)
				if (res.access_token) {
					window.sessionStorage.setItem('access_token', res.access_token)
					navigate('/')
				} else {
					alert(res.message)
				}
			})
				.catch(err => console.log(err))
		}
		setValidated(true)
		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<section className={styles.bg}>
			<div className={styles.container}>
				<Form className={styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
					<h2>Login</h2>
					<Form.Group className="mb-3" controlId="account">
						<Form.Label>Account</Form.Label>
						<Form.Control required type="text" onChange={e => setAccount(e.target.value)} placeholder="Enter account" />
						<Form.Control.Feedback type='invalid'>please input account</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control required type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
						<Form.Control.Feedback type='invalid'>please input password</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit">submit</Button>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button variant="link" onClick={back}>home</Button>
						<Button variant="link" onClick={toRegistry}>registry</Button>
					</div>
				</Form>
			</div>
		</section>
	)
}

export default Login
