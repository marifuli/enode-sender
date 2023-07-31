<script setup>
import { onMounted } from "vue";
import {useStore} from 'vuex'

const store = useStore()
onMounted(() => {
    if(!store.state.smtps.length) add_smtp()
});
function add_smtp() {
    store.commit('add_smtp', {
        host: "",
        port: "",
        secure: "0",
        username: "",
        password: "",
    })
}
function remove_smtp(i) {
    store.commit('remove_smtp', i)
}
</script>
<template>
    <div>
        <div class="card mt-2 p-3">
            <h5>
                Settings:
            </h5>
            <div>
                <!-- <div class="form-group">
                    <label for="">Auto switch smtp after every mail:</label>
                    <select v-model="store.state.settings.auto_switch_smtp" class="form-control">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div> -->
                <div class="form-group">
                    <label for="">Delay after a mail is sent: in seconds</label>
                    <input type="number" v-model="store.state.settings.delay_between_sending" class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="">Defaul Email from address:</label>
                    <input type="text" v-model="store.state.settings.default_mail_from" class="form-control"/>
                </div>
            </div>
        </div>
        <hr>
        <div class="card mt-2" v-for="(smtp, i) in store.state.smtps" :key="i">
            <div class="card-title">
                <button class="btn btn-danger btn-sm" @click="remove_smtp(i)">
                    Remove 
                </button>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="">Host:</label>
                            <input v-model="smtp.host" type="text" class="form-control" placeholder="smtp.gmail.com">
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label for="">Port:</label>
                            <input v-model="smtp.port" type="text" class="form-control" placeholder="25">
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label for="">Secure:</label>
                            <select v-model="smtp.secure" class="form-control">
                                <option value="0" selected>No</option>
                                <option value="1" selected>Yes</option>
                                <!-- <option value="tls">TLS</option>
                                <option value="ssl">SSL</option> -->
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="">Username:</label>
                            <input v-model="smtp.username" type="text" class="form-control" placeholder="example@gmail.com">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="">Password:</label>
                            <input v-model="smtp.password" type="text" class="form-control" placeholder="12345678">
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="">Email from address:</label>
                            <input v-model="smtp.mail_from" type="text" class="form-control" placeholder="noreply@domain.com">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <button class="btn btn-info" @click="add_smtp">
                + Add new
            </button>
        </div>
    </div>
</template>