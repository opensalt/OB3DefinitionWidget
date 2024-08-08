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

const createDefiner = (el, props) => {
    const app = createApp(App, props);
    app.use(plugin, defaultConfig({
        config: customConfig.config,
        inputs: {
            innerLabelTextInput,
            innerLabelTextareaInput,
            selectInputGroup,
        },
    }));
    return app;
}

window.addEventListener('ob3-open', function(event) {
    const selector = event.detail?.selector || '#ob3-definer';
    const mountEl = document.querySelector(selector);
    if (!mountEl) {
        throw new Error('No element found for selector ' + selector);
    }
    const props = { ...mountEl.dataset };
    if (event.detail?.achievement) {
        const achievement = event.detail.achievement;
        if (typeof achievement === 'string') {
            props.achievement = event.detail.achievement;
        } else {
            props.achievement = JSON.stringify(event.detail.achievement);
        }
    }
    const app = createDefiner(selector, props);
    app.mount(selector);
    window.addEventListener('ob3-close', function close() {
        window.removeEventListener('ob3-open', close);
        app.unmount();
    });
});

export default createDefiner;
