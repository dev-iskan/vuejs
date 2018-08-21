<template>
    <div id="app">
        <!--<h1>{{ msg | lowercase }}</h1>
        <h1>{{ msg | uppercase }}</h1>
        <h1>{{ msg | uppercase | lowercase}}</h1>-->

        <input type="text" v-model="search">
        <ul>
            <li v-for="fruit in filteredFruits">{{fruit}}</li>
        </ul>
        <hr>

        <app-list></app-list>
    </div>
</template>

<script>
    import ListMixin from './listMixin.js'
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
            }
        },

        filters: {
            lowercase(value) {
                return value.toLowerCase();
            }
        },
        mixins: [ListMixin]
    }
</script>

<style>
</style>
