interface Props {
  content: string
}

function App (props: Props) {
	const { content } = props
	return (
		<div className="container">{content}</div>
	)
}

export default App
