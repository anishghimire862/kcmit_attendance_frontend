import Vue from 'vue'
import Vuetify, { VSnackbar } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar
  }
})

Vue.use(VuetifyToast, {
  color: 'primary',
  timeout: 4000,
  autoHeight: true,
  dismissable: true
})
