<script setup>
import { onMounted, ref } from "vue";
import {useStore} from 'vuex'

const store = useStore()
const add_new = ref('')
function add() {
    if(add_new.value)
    {
        let emails = add_new.value.split(',')
        if(emails) {
            emails.forEach(e => {
                e = e.trim()
                if(e && store.state.email_addresses.indexOf(e) === -1 
                    && e.split('@').length === 2
                ) 
                    store.state.email_addresses.push(e)
            })
        }
    }
}
function delete_(i) {
    store.state.email_addresses.splice(i, 1)
}
;</script>
<template>
    <div>
        <div class="card mt-2">
            <div class="card-body">
                <h5>Add new: 
                    <small>Separate by comma for multiple.</small>
                </h5>
                <textarea v-model="add_new" rows="5" class="form-control"></textarea>
                <div class="mt-2">
                    <button @click="add" class="btn btn-info btn-sm">
                        Add 
                    </button>
                </div>
                <hr>
                <div class="mt-1">
                    <div v-for="(email, i) in store.state.email_addresses" :key="i">
                        <div class="form-group">
                            <label for="">
                                {{ i+1 }}. Email: 
                                <a href="#" @click.prevent="delete_(i)" class="text-danger">Remove</a>
                            </label>
                            <input v-model="store.state.email_addresses[i]" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="mt-2" v-if="store.state.email_addresses.length">
                        <a href="#" @click.prevent="store.state.email_addresses = []" class="text-danger">Remove All address</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>