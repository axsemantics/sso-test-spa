<template lang="jade">
nav
	ul.nav
		li: a(v-link="'/products/'") NAV
</template>
<script>
export default {
	components: {},
	data() {
		return {
			selectedCell: null
		}
	},
	methods: {

	},
	ready() {

	},
	events: {
		'cell-selected'(data) {
			this.selectedCell = data
		}
	}
}
</script>
<style lang="stylus">
</style>
