//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap";
//import './assets/main.css'
import './assets/style.scss';

import { createApp } from 'vue';
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import customConfig from '../formkit.config.js';
import { innerLabelTextInput } from '@/inputs/innerLabelTextInput.js';
import { innerLabelTextareaInput } from '@/inputs/innerLabelTextareaInput.js';
import { selectInputGroup } from '@/inputs/selectInputGroup.js';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(plugin, defaultConfig({
    config: customConfig.config,
    inputs: {
        innerLabelTextInput,
        innerLabelTextareaInput,
        selectInputGroup,
    },
}));
app.mount('#app');
