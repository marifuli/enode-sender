import { createStore } from 'vuex'

export default createStore({
    state: {
        settings: {
            delay_between_sending: "0", // seconds
            default_mail_from: "admin@example.com"
        },
        smtps: [
            
        ],
        email_addresses: [
            "hi@smtp",
            "hi2@smtp",
            "hi3@smtp",
        ],
        email_template: {
            subject: "Hello there",
            body: "Hi my firends!",
            attachment: null,
            include_data_in_attachment: 'true',
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