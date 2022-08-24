interface Props {
  content: string
}

function App (props: Props) {
	const { content } = props
	return (
		<>{content}</>
	)
}

export default App
