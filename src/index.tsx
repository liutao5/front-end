import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<>
		<div>hello world</div>
		<App content='finaly' />
	</>
)
