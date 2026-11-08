import { createApp } from 'vue'

import App from './App.vue'

import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/onepage.css'
import './styles/luxury.css'
import './styles/glass.css'

const app = createApp(App)
app.mount('#app')
