<script setup>
import { onBeforeMount, ref } from "vue";

const props = defineProps({
    setSection: Function,
})
let active_nav = ref()
onBeforeMount(() => {
    setNav('smtp')
})
function setNav(n) {
    active_nav.value = n
    props.setSection(n)
}
;</script>
<template>
    <div>
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width:200px; height: 100vh;">
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a @click="setNav('smtp')" 
                        class="nav-link" :class="{active: active_nav === 'smtp'}" aria-current="page">
                        SMTP Servers
                    </a>
                </li>
                <li>
                    <a @click="setNav('list')" 
                        class="nav-link" :class="{active: active_nav === 'list'}">
                        Address List
                    </a>
                </li>
                <li>
                    <a @click="setNav('email')" 
                        class="nav-link" :class="{active: active_nav === 'email'}">
                        Email Template
                    </a>
                </li>
                <li>
                    <a @click="setNav('sending')" 
                        class="nav-link" :class="{active: active_nav === 'sending'}">
                        Send
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>