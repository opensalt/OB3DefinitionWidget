//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap";
//import './assets/main.css'
//import './assets/style.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { plugin, defaultConfig } from "@formkit/vue";
import customConfig from '../formkit.config.js';
import { innerLabelTextInput } from '@/inputs/innerLabelTextInput.js';
import { innerLabelTextareaInput } from '@/inputs/innerLabelTextareaInput.js';
import { selectInputGroup } from '@/inputs/selectInputGroup.js';

const mountEl = document.querySelector('#ob3-definer');
const app = createApp(App, { ...mountEl.dataset });
app.use(plugin, defaultConfig({
    config: customConfig.config,
    inputs: {
        innerLabelTextInput,
        innerLabelTextareaInput,
        selectInputGroup,
    },
}));
app.mount('#ob3-definer');

export default app;
