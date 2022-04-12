import { createApp } from 'vue'
import App from './App.vue'
import { setup } from './utils/bootstrap'

import 'animate.css'

import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'
import Playground from './views/Playground/index.vue'

setup({
    onProduction: () => {
        createApp(App).mount('#app')
    },
    onDevelopment: () => {
        createApp(Playground).mount('#app')
    }
})
