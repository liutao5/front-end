import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import { registry } from './service'

export default function Registry() {
	const [account, setAccount] = useState<string>()
	const [password, setPassword] = useState<string>()
	const [confirPassword, setConfirmPassword] = useState<string>()
	const [validated, setValidated] = useState(false)
	const [accountMsg, setAccountMsg] = useState('please input account')
	const [errMsg, setErrMsg] = useState('please input confirm password')
	const confirmPasswordRef = useRef<HTMLInputElement>(null)
	const accountRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()

	const back = () => navigate('/')

	const toLogin = () => navigate('/login')

	const checkPassword = () => {
		if (password === confirPassword) {
			confirmPasswordRef.current?.setCustomValidity('')
		} else {
			setErrMsg('confirm password must be same with password')
			confirmPasswordRef.current?.setCustomValidity('error')
		}
	}

	useEffect(() => {
		if (password && confirPassword && validated) {
			checkPassword()
		}
	}, [password, confirPassword, validated])

	useEffect(() => {
		if (account) {
			accountRef.current?.setCustomValidity('')
		} else {
			setAccountMsg('please input account')
			accountRef.current?.setCustomValidity('error')
		}
	}, [account])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget
		checkPassword()
		if (form.checkValidity()) {
			registry({
				account,
				password,
			}).then(res => {
				if (res.ok) {
					navigate('/login')
				} else {
					accountRef.current?.setCustomValidity('error')
					setAccountMsg(res.errMsg)
				}
			})
		}
		setValidated(true)
		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<section className={styles.bg}>
			<div className={styles.container}>
				{/* <Form className={styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
					<h2>Registry</h2>
					<Form.Group className="mb-3" controlId="account">
						<Form.Label>Account</Form.Label>
						<Form.Control ref={accountRef} required type="text" onChange={e => setAccount(e.target.value)} placeholder="Enter account" />
						<Form.Control.Feedback type="invalid">{accountMsg}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control required type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
						<Form.Control.Feedback type="invalid">please input password</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control ref={confirmPasswordRef} required formNoValidate type="password" onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
						<Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit">submit</Button>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button variant="link" onClick={back}>home</Button>
						<Button variant="link" onClick={toLogin}>login</Button>
					</div>
				</Form> */}
			</div>
		</section>
	)
}
