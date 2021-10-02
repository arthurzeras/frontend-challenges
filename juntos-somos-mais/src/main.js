import App from './App.vue';
import { createApp } from 'vue';
import './assets/scss/styles.scss';
import AppIcon from './components/AppIcon/AppIcon.vue';

createApp(App).component('app-icon', AppIcon).mount('#app');
