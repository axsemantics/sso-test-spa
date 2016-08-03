import Auth0Lock from 'auth0-lock'
import api from 'lib/api'

let auth = {
	lock: null,
	authenticated: false,
	init() {
		auth.lock = new Auth0Lock('B4wfTnpzLjnvDYGgnC1HmEebTrEF1uEn',
			'ax-semantics.eu.auth0.com')

		const saveAuth = (token, profile) => {
			localStorage.setItem('id_token', token)
			localStorage.setItem('profile', JSON.stringify(profile))
			api.headers.set('Authorization', 'Bearer ' + token)
			auth.authenticated = true
		}

		// if we have a token, only fetch user profile data
		if ('id_token' in localStorage) {
			let token = localStorage.id_token
			return new Promise((resolve, reject) => {
				auth.lock.getProfile(token, (error, profile) => {
					console.log(error) // TODO THROW
					if (!error) resolve(profile)
				})
			}).then((profile) => {
				saveAuth(token, profile)
				return Promise.resolve()
			})
		} else {
			// is this a callback?
			auth.lock.on('authenticated', function(authResult) {
				auth.lock.getProfile(authResult.idToken, function(error, profile) {
					if (error) {
						// Handle error
						return
					}
					saveAuth(authResult.idToken, profile)
					console.log('HIDE')
					auth.lock.hide()
				})
			})
			auth.lock.on('authorization_error', (err) => console.log('faail', err))
			return Promise.reject()
		}

	}
}

export default auth
