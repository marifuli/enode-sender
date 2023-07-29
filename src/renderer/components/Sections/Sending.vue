<script setup>
import { ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import mail from './../../actions/mail'

const store = useStore()
const started = ref(false)
function start() {
    started.value = true 
    mail(
        toRaw(store.state), 
        (failed) => {

        }, 
        (success) => {

        }, 
    )
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
                            Sending:
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="progress">
                                <div class="progress-bar" 
                                    :style="{width: (
                                        store.state.sending_results.length / 100 * (store.state.sending_results.successful.length + store.state.sending_results.error.length)
                                    ) + '%'}"
                                ></div>
                            </div>
                        </div>
                        <span class="text-success">
                            {{ store.state.sending_results.successful.length }} sent.
                        </span>
                        <span class="text-danger">
                            {{ store.state.sending_results.error.length }} failed.
                        </span>
                    </div>
                    <div class="modal-footer">
                        <button 
                            @click="started = false"
                            type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel & Close 
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