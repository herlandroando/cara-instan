import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Markdown from 'vue3-markdown-it';
import router from './router'
import _ from "lodash"

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'highlight.js/styles/monokai.css';
// const db = firebase.firestore();

const app = createApp(App).use(router);
app.config.globalProperties.$_ = _;

app.use(PrimeVue);
app.use(Markdown)
// app.provide("db",db);
app.mount('#app')