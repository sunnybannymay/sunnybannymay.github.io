import Vue from 'vue';
import Router from 'vue-router';
import Table from '../components/table/Table.vue';
import favourites from '../components/favourites.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Table
        },
        {
            path: '/favourites',
            component: favourites
        }
    ]
});