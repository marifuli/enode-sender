<script setup>
import { onMounted } from "vue";
import {useStore} from 'vuex'

const store = useStore()
onMounted(() => {
    store.commit('update_smtps', ['awef wef wef ew'])
});
</script>
<template>
    <div>
        dfawef awe {{ $store.state.smtps }}
    </div>
</template>