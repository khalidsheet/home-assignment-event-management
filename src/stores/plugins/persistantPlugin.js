export const localStoragePlugin = store => {
  store.commit('initStore')

  store.subscribe((_, state) => {
    localStorage.setItem('calendar', JSON.stringify(state))
  })
}
