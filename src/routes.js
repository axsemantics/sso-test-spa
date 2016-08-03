import App from './App'
import Main from 'views/main'

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
	// '/login': {
	// 	component: Login
	// }
}

export default routes
