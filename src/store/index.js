import { createStore } from 'vuex'

export default createStore({
    state: {
        user: 'John Doe',
        events: []
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        }
    },
    actions: {},
    modules: {}
})
