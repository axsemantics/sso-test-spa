<template lang="jade">
.spinner-wrapper.active(:class="[size, {center: center, page: page}]")
	.spinner-layer
		.circle-clipper.left
			.circle
		.gap-patch
			.circle
		.circle-clipper.right
			.circle
</template>
<script>

export default {
	name: 'spinner',
	props: {
		center: {
			type: Boolean,
			default: false
		},
		page: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: "normal"
		}
	},
	data() {
		return {
		}
	},
	ready() {

	},
	beforeDestroy() {

	},
	methods: {
	}
}
</script>
<style lang="stylus">
/*
 * Constants:
 *      STROKEWIDTH = 3px
 *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)
 *      ARCTIME     = 1333ms (time it takes to expand and contract arc)
 *      ARCSTARTROT = 216 degrees (how much the start location of the arc
 *                                should rotate each time, 216 gives us a
 *                                5 pointed star shape (it's 360/5 * 3).
 *                                For a 7 pointed star, we might do
 *                                360/7 * 3 = 154.286)
 *      CONTAINERWIDTH = 28px
 *      SHRINK_TIME = 400ms
 */

.spinner-wrapper
	display inline-block
	position relative
	width 48px
	height 48px

	&.tiny
		width 14px
		height 14px
		.circle
			border-width 2px
	
	&.small
		width 24px
		height 24px
		.circle
			border-width 3px

	&.big
		width 64px
		height 64px

	&.huge
		width 128px
		height 128px
		.circle
			border-width 16px

	&.active
		/* duration: 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */
		animation container-rotate 1568ms linear infinite

	&.center
		display block
		margin auto

	&.page
		display block
		margin 7rem auto //flex that better

	*
		box-sizing border-box

@keyframes container-rotate
	to
		transform rotate(360deg)

.spinner-layer
	position absolute
	width 100%
	height 100%
	opacity 0
	border-color $spinner-default-color

.active .spinner-layer
	/* durations 4 * ARCTIME */
	opacity 1
	animation fill-unfill-rotate 5332ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both

@keyframes fill-unfill-rotate
	12.5%
		transform rotate(135deg) /* 0.5 * ARCSIZE */
	25%
		transform rotate(270deg) /* 1   * ARCSIZE */
	37.5%
		transform rotate(405deg) /* 1.5 * ARCSIZE */
	50%
		transform rotate(540deg) /* 2   * ARCSIZE */
	62.5%
		transform rotate(675deg) /* 2.5 * ARCSIZE */
	75%
		transform rotate(810deg) /* 3   * ARCSIZE */
	87.5%
		transform rotate(945deg) /* 3.5 * ARCSIZE */
	to
		transform rotate(1080deg) /* 4   * ARCSIZE */

/**
 * Patch the gap that appear between the two adjacent div.circle-clipper while the
 * spinner is rotating (appears on Chrome 38, Safari 7.1, and IE 11).
 */
.gap-patch
	position absolute
	top 0
	left 45%
	width 10%
	height 100%
	overflow hidden
	border-color inherit

	.circle
		width 1000%
		left -450%

.circle-clipper
	display inline-block
	position relative
	width 50%
	height 100%
	overflow hidden
	border-color inherit

	.circle
		width 200%
		height 100%
		border-width 5px /* STROKEWIDTH */
		border-style solid
		border-color inherit
		border-bottom-color transparent !important
		border-radius 50%
		animation none
		position absolute
		top 0
		right 0
		bottom 0

	&.left .circle
		left 0
		border-right-color transparent !important
		transform rotate(129deg)
	&.right .circle
		left -100%
		border-left-color transparent !important
		transform rotate(-129deg)

.active .circle-clipper.left .circle
	/* duration ARCTIME */
	animation left-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both

.active .circle-clipper.right .circle
	/* duration ARCTIME */
	animation right-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both


@keyframes left-spin
	from
		transform rotate(130deg)
	50%
		transform rotate(-5deg)
	to
		transform rotate(130deg)

@keyframes right-spin
	from
		transform rotate(-130deg)
	50%
		transform rotate(5deg)
	to
		transform rotate(-130deg)

#spinnerContainer.cooldown
	/* duration SHRINK_TIME */
	animation container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0.0, 0.2, 1)

@keyframes fade-out
	from
		opacity 1
	to
		opacity 0
</style>
