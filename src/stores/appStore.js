import { createStore } from 'vuex'
import { localStoragePlugin } from './plugins/persistantPlugin'

export const appStore = createStore({
  plugins: [localStoragePlugin],
  state() {
    return {
      events: [],
    }
  },
  mutations: {
    addEvent(state, event) {
      state.events.push(event)
    },
    editEvent(state, { index, event }) {
      state.events[index] = event
    },
    deleteEvent(state, index) {
      state.events.splice(index, 1)
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
