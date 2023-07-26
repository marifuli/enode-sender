import { createStore } from 'vuex'

export default createStore({
    state: {
        settings: {
            auto_switch_smtp: "0", // keep 0 for not changing
            delay_between_sending: "0", // seconds
        },
        smtps: [
            
        ],
        email_addresses: [],
        email_template: {
            subject: "",
            body: "",
            attachment: null,
            include_data_in_attachment: true,
            url_per_domain: {}
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
        add_smtp(state, data) {
            state.smtps.push(data) 
        },
        remove_smtp(state, data) {
            state.smtps.splice(data, 1) 
        },
        remove_email(state, i) {
            state.smtps.splice(data, 1) 
        },
    },
    getters: {

    }
})