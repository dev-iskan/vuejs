<template>
    <div>
        <h1>Cars page</h1>

        <ul>
            <router-link tag="li" class="nav-item"
            v-for="car in 5"
            :to="'/car/'+car"
            :key="car">
                <a class="nav-link">Car {{car}}</a>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {

    }
</script>

<styles scoped>

</styles>