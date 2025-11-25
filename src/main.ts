import { createApp } from 'vue'
import 'virtual:windi.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faPenSquare, faTrash, faPlusCircle)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
