<template lang="jade">
h1 LOGGIN!
</template>
<script>
import api from 'lib/api'

export default {
	data() {
		return {
		}
	},
	ready() {
		console.log(api.auth)
		api.auth.lock.show()
	}
}
</script>
<style lang="stylus">
</style>
