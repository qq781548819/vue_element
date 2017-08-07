<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import './style/common';
@import './style/flex';
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.router-fade-enter-active,
.router-fade-leave-active {
	transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
	opacity: 0;
}
</style>
