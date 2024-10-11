import '@/style.css'
<<<<<<< HEAD
=======
import '@fortawesome/fontawesome-free/css/all.css';
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/hybrid.css'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
