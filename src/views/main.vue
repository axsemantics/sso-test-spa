<template lang="jade">
h1 YOU ARE IN!
p {{ me | json }}
</template>
<script>
import api from 'lib/api'
export default {
	data() {
		return {
			me: ''
		}
	},
	ready() {
		api.me().then((json) => {
			this.me = json
		}
		)
	}
}
</script>
<style lang="stylus">
</style>
