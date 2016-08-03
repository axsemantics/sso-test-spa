import Vue from 'vue'
import Router from 'vue-router'
import Keen from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'

import Üei from 'toolkit/üei'

import api from 'lib/api'
import auth from 'lib/api/auth'
import routes from './routes'
import App from './App'
import 'filters'

Vue.use(Router)
Vue.use(Keen)
Vue.use(Üei)

let router = new Router({
	history: true
})

router.map(routes)

router.beforeEach((transition) => {
	if (transition.to.auth && !auth.authenticated) {
		console.log('redirect')
		transition.redirect('/login')
	} else {
		transition.next()
	}
})

auth.init().then(() => {
	router.start({}, 'body')
}).catch((error) => {
	router.start({}, 'body')
})
