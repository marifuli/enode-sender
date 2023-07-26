<script setup>
import SideNav from './components/SideNav.vue'
import Smtps from './components/Sections/Smtps.vue'
import Addresses from './components/Sections/Addresses.vue'
import { ref } from 'vue'
import { useStore } from "vuex"

const store = useStore()
let active_sectoin = ref('')
function setSection(type) {
	active_sectoin.value = type
}
</script>
<template>
	<div>
		<SideNav :setSection="setSection"/>
		<div style="width: 100%;padding: 20px;padding-left: 220px;">
			<div style="max-width: 1200px; margin: auto">
				<Smtps v-if="active_sectoin === 'smtp'" />	
				<Addresses v-if="active_sectoin === 'list'" />	
			</div>
		</div>
	</div>
</template>