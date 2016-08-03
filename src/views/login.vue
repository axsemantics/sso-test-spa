<template lang="jade">
h1 LOGGIN!
</template>
<script>
import api from 'lib/api'
import auth from 'lib/api/auth'

export default {
	data() {
		return {
		}
	},
	ready() {
 			auth.lock.show()
	}
}
</script>
<style lang="stylus">
</style>
