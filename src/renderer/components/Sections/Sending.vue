<script setup>
import { ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import mail from './../../actions/mail'

const store = useStore()
const finished = ref(false)
const started = ref(false)
const canContinue = ref(true)
const show_results = ref(1)
function start() {
    started.value = true 
    finished.value = false
    store.state.sending_results.successful = []
    store.state.sending_results.error = []
    mail(
        toRaw(store.state), 
        {
            failed: email => {
                store.state.sending_results.error.push(email)
            },
            success: email => {
                store.state.sending_results.successful.push(email)
            },
            cancelled: () => {
                started.value = false 
            },
            canContinue: () => {
                // will run after every email sent. return true to continue or false to cancel
                return canContinue.value
            },
            completed: () => finished.value = true,
        }
    )
}
function cancel() 
{
    canContinue.value = false 
    started.value = false 
}
;</script>
<template>
    <div>
        <div >
            SMTP server: 
            <span v-if="store.state.smtps.length" class="text-success">{{ store.state.smtps.length }} Added</span>
            <span v-else class="text-danger">No SMTP server added</span>
            <br> 
            <br> 
            Email List: 
            <span v-if="store.state.email_addresses.length" class="text-success">{{ store.state.email_addresses.length }} Added</span>
            <span v-else class="text-danger">No email address added</span>
            <br>
            <br>
            Email Template: 
            <br>
            <span v-if="!store.state.email_template.subject" class="text-danger">Email have no subject</span>
            <span class="text-success" v-else>Email has a subject</span>
            <br>
            <span v-if="!store.state.email_template.body" class="text-danger">Email have no body</span>
            <span class="text-success" v-else>Email has a body</span>
            <br>
            <br>
            <br>
            <button 
                v-if="store.state.smtps.length && store.state.email_addresses.length"
                @click="start" class="btn btn-success">
                Start sending
            </button>
        </div>
        <div class="modal fade" :class="{show: started}">
            <div class="modal-dialog" style="margin: 0 !important; height: 100vh;">
                <div class="modal-content" style="width: 100vw; height: 100vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            {{ finished ? 'Done!' : "Sending:" }}
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="progress">
                                <div class="progress-bar" 
                                    :style="{width: (
                                       ( (store.state.sending_results.successful.length + store.state.sending_results.error.length) / store.state.email_addresses.length) * 100
                                    ) + '%'}"
                                ></div>
                            </div>
                        </div>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a @click.prevent="show_results = 1" class="nav-link text-success" :class="{active: show_results === 1}" href="#">
                                    {{ store.state.sending_results.successful.length }} sent.
                                </a>
                            </li>
                            <li class="nav-item">
                                <a @click.prevent="show_results = 0" class="nav-link text-danger" :class="{active: show_results === 0}" href="#">
                                    {{ store.state.sending_results.error.length }} failed.
                                </a>
                            </li>
                        </ul>
                        <div style="margin-top: 10px; max-height: 60vh; overflow: auto;">
                            <div v-if="show_results === 1">
                                <div v-for="(e, i) in store.state.sending_results.successful" :key="i">
                                    {{ e }}
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="(e, i) in store.state.sending_results.error" :key="i">
                                    {{ e }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button 
                            @click="cancel"
                            type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            {{finished ? '' : "Cancel &"}} Close 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.show {
    display: block !important;
}
/* .modal.show .modal-dialog */
</style>