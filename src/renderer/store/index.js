import { createStore } from 'vuex'

export default createStore({
    state: {
        smtps: []
    },
    mutations: {
        update_smtps(state, data) {
            state.smtps = data 
        },
    },
    getters: {

    }
})