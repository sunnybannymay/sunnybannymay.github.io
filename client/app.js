import Vue from 'vue';
import App from './components/App';
import store from './store/store'
import { sync } from 'vuex-router-sync';
import router from './router/router';

sync(store, router);

const app = new Vue({
    store,
    router,
    ...App
});
export {app,router,store}