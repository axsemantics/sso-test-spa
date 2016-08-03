import Auth0Lock from 'auth0-lock'

import config from 'config'
const BASE_URL = config.api.baseUrl
let headers = new Headers()
headers.append('Content-Type', 'application/json')

let api = {
	auth: {
		lock: new Auth0Lock('B4wfTnpzLjnvDYGgnC1HmEebTrEF1uEn',
			'ax-semantics.eu.auth0.com'),
		authenticated: false,
		getSession() {
			if ('id_token' in localStorage) {
				let token = localStorage.id_token
				return new Promise((resolve, reject) => {
					api.auth.lock.getProfile(token, (error, profile) => {
						if (!error) resolve(profile)
					})
				}).then((profile) => {
					localStorage.setItem('profile', JSON.stringify(profile))
					headers.set('Authorization', 'Bearer ' + token)
					api.auth.authenticated = true
					return Promise.resolve()
				})
			} else {
				return Promise.reject()
			}
		}
	}
}

api.fetch = function(url, method, body) {
	let options = {
		method: method || 'GET',
		headers,
		body
	}
	return fetch(BASE_URL + url, options).then((response) => {
		return response.json().then((json) => {
			if (!response.ok)
				return Promise.reject(json)

			return Promise.resolve(json)
		})
	}).catch((error) => {
		// mediator.emit('fetch-error', error)
		return Promise.reject(error)
	})
}

api.auth.lock.on('authenticated', function(authResult) {
	console.log('whattup')
	api.auth.lock.getProfile(authResult.idToken, function(error, profile) {
		if (error) {
			// Handle error
			return
		}
		console.log('sev it')
		localStorage.setItem('id_token', authResult.idToken)
		localStorage.setItem('profile', JSON.stringify(profile))
		headers.set('Authorization', 'Bearer ' + authResult.idToken)
		api.auth.authenticated = true
		api.auth.lock.hide()
	})
})

export default api
