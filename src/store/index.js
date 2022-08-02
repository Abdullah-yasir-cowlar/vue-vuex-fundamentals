import { createStore } from 'vuex'
import EventService from '../services/EventService'

export default createStore({
    state: {
        user: 'John Doe',
        events: [],
        eventDetails: null
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENTS(state, events) {
            state.events = events
        },
        SET_EVENT_DETAILS(state, event) {
            state.eventDetails = event
        }
    },
    actions: {
        createEvent({ commit }, event) {
            EventService.postEvent(this.event)
                .then(() => {
                    // add event to the store
                    commit('ADD_EVENT', event)
                })
                .catch(err => {
                    console.log('An error occured while creating an event', err)
                })
        },
        fetchEvents({ commit }) {
            EventService.getEvents()
                .then(response => {
                    commit('SET_EVENTS', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        fetchSingleEvent({ commit, state }, id) {
            // check if we have it already in the store
            const existingEvent = state.events.find(ev => ev.id === id)

            console.log({ existingEvent })
            if (existingEvent) {
                commit('SET_EVENT_DETAILS', existingEvent)
            } else {
                EventService.getEvents(id)
                    .then(response => {
                        commit('SET_EVENT_DETAILS', response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    },
    modules: {}
})
