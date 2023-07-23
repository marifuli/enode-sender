<script setup>
import SideNav from './components/SideNav.vue'
import Smtps from './components/Sections/Smtps.vue'
import { ref } from 'vue'

let active_sectoin = ref('')
function setSection(type) {
	active_sectoin.value = type 
}
</script>
<template>
	<div style="display: flex;">
		<SideNav :setSection="setSection"/>
		<div>
			{{ active_sectoin }}
			<div class="m-3">
				<Smtps v-if="active_sectoin === 'smtp'" />	
			</div>
		</div>
	</div>
</template>