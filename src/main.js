import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './element-ui@2.13.2.css'
import Dialog from './components/dialog/index'
const app = createApp(App)
app.component(Dialog.name, Dialog)

app.mount('#app')
