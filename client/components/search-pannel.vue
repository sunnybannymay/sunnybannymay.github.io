<template>
    <div class="container">
        <h1 class="page__title">Weather</h1>

        <div class="search-panel">
            <input class="search-panel__input"
                   type="search"
                   placeholder="Search item"
                   v-on:input="searchCity($event.target.value)">
            <div class="search-panel__list">
                <div class="search-panel__list__item" v-for="city in foundedCityList" @click="addToFav(city)">
                    {{ city.name }}
                </div>
            </div>
        </div>

        <div class="cities-list" v-if="foundedCityList.length === 0">
            <div class="city-card" v-for="city in getFavouriteCityList" :href="'/city/' + city.name">
                <router-link v-bind:to="'/city/' + city.name" class="city-card__content">
                    <div class="city-card__content__status-icon"
                         v-bind:style="{ 'background-image': 'url(' + city.icon_url + ')' }"></div>
                    <div class="city-card__content__condition">{{city.conditionText}}</div>
                    <div class="city-card__content__temperature">{{city.temperature}}°C</div>
                    <div class="city-card__content__title">{{city.name}}</div>
                </router-link>
                <button class="city-card__remove" @click="$store.commit('removeFromFavourite', city)">Remove from fav</button>
            </div>
        </div>
    </div>
</template>

<script>

</script>