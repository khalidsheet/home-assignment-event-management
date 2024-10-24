import { createStore } from 'vuex'
import { localStoragePlugin } from './plugins/persistantPlugin'

export const appStore = createStore({
  plugins: [localStoragePlugin],
  state() {
    return {
      events: [],
      searchTerm: '',
    }
  },
  mutations: {
    addEvent(state, event) {
      const id = Math.random().toString(36).substring(7)
      state.events.push({
        ...event,
        id,
        class: event.status.toLowerCase(),
      })
    },
    editEvent(_, { id, event }) {
      this.commit('deleteEvent', id)
      this.commit('addEvent', event)
    },
    deleteEvent(state, id) {
      state.events = state.events.filter(event => event.id !== id)
    },
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    initStore(state) {
      const store = localStorage.getItem('calendar')
      if (store) {
        this.replaceState(Object.assign(state, JSON.parse(store)))
      } else {
        localStorage.setItem('calendar', JSON.stringify(state))
      }
    },
  },
})
