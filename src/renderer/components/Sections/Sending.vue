<script setup>
import { ref } from 'vue'
import mail from './../../actions/mail'

console.log(mail)
const started = ref(false)

;</script>
<template>
    <div>
        <div >

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
                        ...
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