<template>

    <div class="container favs-page">
        <router-link class="favs-page__router-back" to="/">
            <button class="favs-page__button-back">Back</button>
        </router-link>
        <table class="fav-Items__table">
            <tr>
                <th v-for="key in columns">{{key}}</th>
            </tr>
            <tr v-for="item in favItemsList">
                <td>{{item.market_hash_name}}</td>
                <td>{{item.lowest_price}}</td>
                <td>{{item.price}}</td>
                <td>{{item.bitop}} %</td>
                <td>{{item.opbit}} %</td>
                <td>
                    <button :class="{delete: true}" @click="deleteItemFav(item)">Delete from favs</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    import axios from 'axios';
    import * as action_types from '../store/action-types';
    import * as getter_types from '../store/getter-types';
    import * as mutation_types from '../store/mutation-types';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data() {
            return {
                columns: ['item name', 'lowest price bitskins', 'lowest price opskins', 'BIT/OP (%)', 'OP/BIT (%)','Delete from fav']

            }
        },
        methods: {
            deleteItemFav(item) {
    this.$store.commit(mutation_types.DELETE_FROM_FAV,item);
            }
//            searchItem: (value) => {
//                this.$store.dispatch([action_types.SEARCH_ITEM], value);
////                    .then((res) => {
////                        this.foundedCityList = res.filter((foundCity) => {
////// If city already in favourite list - delete it
////                            const index = this.$store.state.favouriteCityList
////                                .findIndex((favCity) => foundCity.id === favCity.id);
////                            return index === -1;
////                        });
////                    })
////                    .catch(() => this.foundedCityList = []);
//            },
        },
        computed:
            mapGetters({
                favItemsList: getter_types.GET_FAVOURITE_ITEMS
            }),
        mounted() {
            this.$store.dispatch(action_types.GET_FAV_ITEMS);
        }
    };
</script>

<style lang="scss">
    $maincolor: #42b983;
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid $maincolor;
        border-radius: 3px;
        background-color: #fff;
    }

    th {
        background-color: $maincolor;
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }

    th.active {
        color: #fff;
        .arrow {
            opacity: 1;
        }
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
        &.asc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #fff;
        }
        &.dsc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid #fff;
        }
    }

    button {
        text-decoration: none;
        text-align: center;
        padding: 11px 32px;
        border: solid 1px $maincolor;
        -webkit-border-radius: 19px;
        -moz-border-radius: 19px;
        border-radius: 19px;
        font: 18px Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: $maincolor;
        background: #ffffff;
        margin-bottom: 30px;
        margin-top: 30px;
    }

    .delete {
        background-color: #edf6ff;
        font: 12px Arial, Helvetica, sans-serif;
        font-weight: bold;
    }
</style>