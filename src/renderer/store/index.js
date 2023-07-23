import { createStore } from 'vuex'

export default createStore({
    state: {
        settings: {
            auto_switch_smtp: 0, // keep 0 for not changing
            delay_between_sending: 0, // seconds
        },
        smtps: [
            {
                host: "",
                port: "",
                auth: true,
                username: "",
                password: "",
            }
        ],
        email_addresses: [],
        email_template: {
            subject: "",
            body: "",
            attachment: null,
        },
        sending_results: {
            successful: [],
            error: []
        }
    },
    mutations: {
        update_smtps(state, data) {
            state.smtps = data 
        },
    },
    getters: {

    }
})