<script setup>
import SideNav from './components/SideNav.vue'
import Smtps from './components/Sections/Smtps.vue'
import Addresses from './components/Sections/Addresses.vue'
import EmailTemplate from './components/Sections/EmailTemplate.vue'
import Sending from './components/Sections/Sending.vue'
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
			<div style="max-width: 900px; margin: auto">
				<Smtps v-if="active_sectoin === 'smtp'" />	
				<Addresses v-if="active_sectoin === 'list'" />	
				<EmailTemplate v-if="active_sectoin === 'email'" />	
				<Sending v-if="active_sectoin === 'sending'" />	
			</div>
		</div>
	</div>
</template>