<template>
    <div>
        <h1>List</h1>
        <input type="text" v-model="search">
        <ul>
            <li v-for="fruit in filteredFruits">{{fruit}}</li>
        </ul>
    </div>
</template>

<script>
    import ListMixin from './listMixin.js'
    export default {
        mixins: [ListMixin]
    }
</script>