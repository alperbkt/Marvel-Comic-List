import { createApp } from 'vue'

// İCONLAR
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas,far);

import App from './App.vue'
import router from './router'
import store from './store'



createApp(App)
.component('fa',FontAwesomeIcon)
.component('far',FontAwesomeIcon)
.use(store)
.use(router)
.mount('#app')

