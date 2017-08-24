import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import * as mutation_types from './mutation-types';
import * as action_types from './action-types';
import * as getter_types from './getter-types';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    items_bitskins: [],
    items_opskins: [],
    items: [],
    favouriteItemsList: []
};

const getters = {
    [getter_types.GET_ITEMS_BITSKINS]: state => state.items_bitskins,
    [getter_types.GET_ITEMS_OPSKINS]: state => state.items_opskins,
    [getter_types.GET_ITEMS]: state => {
        if (state.items_bitskins.length === 0 || state.items_opskins.length === 0) {
            store.dispatch(action_types.GET_ITEMS_BITSKINS);
            store.dispatch(action_types.GET_ITEMS_OPSKINS);
        }
        store.commit(mutation_types.GET_ALL_ITEMS);
        return state.items;
    },
    [getter_types.GET_FAVOURITE_ITEMS]: state => state.favouriteItemsList
};
const actions = {
    [action_types.GET_ITEMS_BITSKINS]({commit}) {
        api.getItemsData_bitskins(
            items => {
                commit(mutation_types.UPLOAD_DATA, {items})
            }
        )
    },
    [action_types.GET_ITEMS_OPSKINS]({commit}) {
        api.getItemsData_opskins(
            items => {
                commit(mutation_types.UPLOAD_DATA_OPSKINS, {items})
            }
        )
    },
    [action_types.ADD_TO_FAVS]({commit}, item) {
        item.addedToFav=true;
        commit(mutation_types.ADD_TO_FAVS, item);
    },
    [action_types.GET_FAV_ITEMS]({commit},reject) {
        axios.get('http://localhost:3000/favItemsList')
            .then((res) => {
                commit(mutation_types.GET_FAV_ITEMS, res.data);
            })
            .catch(() => reject());
    },
    [action_types.SEARCH_ITEM] (value) {
        return new Promise((resolve, reject) => {
            api_local.search(value, resolve, reject);
        });
    }
};
// const api_local={
//     search(searchString, resolve, reject) {
//         axios.get(`${host}/favItemsList?q=${searchString}`)
//             .then(resolve)
//             .catch(reject);
//     }
// };
const mutations = {
    [mutation_types.UPLOAD_DATA](state, {items}) {
        state.items_bitskins = items;
        //console.log(state.items_bitskins);
    },
    [mutation_types.UPLOAD_DATA_OPSKINS](state, {items}) {
        items = _(items) //wrap object so that you can chain lodash methods
            .mapValues((value, market_hash_name) => _.merge({}, value, {market_hash_name})) //attach id to object
            .values() //get the values of the result
            .value();
        state.items_opskins = items;
    },
    [mutation_types.GET_ALL_ITEMS](state) {
        state.items = _(state.items_bitskins) // start sequence
            .keyBy('market_hash_name') // create a dictionary of the 1st array
            .merge(_.keyBy(state.items_opskins, 'market_hash_name')) // create a dictionary of the 2nd array, and merge it to the 1st
            .values() // turn the combined dictionary to array
            .value().map((item) => {
                item.price = item.price / 100;
                item.bitop = (item.lowest_price / item.price * 100).toFixed(2);
                item.opbit = (item.price / item.lowest_price * 100).toFixed(2);
                item.addedToFav = false;
                return item;
            });
    },
    [mutation_types.ADD_TO_FAVS](state, item) {
        console.log(state.favouriteItemsList);
        state.favouriteItemsList.push(item);
        axios.post('http://localhost:3000/favItemsList', item);
    },
    [mutation_types.GET_FAV_ITEMS](state, favitems) {
        state.favouriteItemsList = favitems;
        console.log(state.favouriteItemsList);
    },
    [mutation_types.DELETE_FROM_FAV](state, itemToRemove) {
        const index = state.favouriteItemsList
            .findIndex(item => itemToRemove.id === item.id);
        state.favouriteItemsList.splice(index, 1);
        axios.delete('http://localhost:3000/favItemsList/' + itemToRemove.id);
    },
    searchItem(value)
    {

    }

};
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
export default store