import App from './App'
import Main from 'views/main'
import Login from 'views/login'

let routes = {
	'/': {
		component: App,
		subRoutes: {
			'/': {
				component: Main
			}
		},
		auth: true
	},
	'/login': {
		component: Login
	}
}
export default routes
