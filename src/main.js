// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {
  VForm,
  VTextField,
  VTextarea,
  VRow,
  VCol,
  VCard,
  VSelect,
  VSpacer,
  VCardText,
  VBtn,
  VCardActions,
  VDialog,
  VSnackbar,
} from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { appStore } from './stores/appStore'
import './assets/main.css'

const vuetify = createVuetify({
  components: {
    VDateInput,
    VForm,
    VTextField,
    VTextarea,
    VRow,
    VCol,
    VCard,
    VSelect,
    VSpacer,
    VCardText,
    VBtn,
    VCardActions,
    VDialog,
    VSnackbar,
  },
  directives,
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(appStore)

app.mount('#app')
