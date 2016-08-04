import config from 'config'
const BASE_URL = config.api.baseUrl
let headers = new Headers()
headers.append('Content-Type', 'application/json')

let api = {
	headers,
	me() {
		return api.fetch('http://localhost:9000/v1/me/')
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

export default api
