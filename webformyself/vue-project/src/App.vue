<template>
    <div>
        <!--<h1>Parent: {{carName}}</h1>-->
        <!--<app-counter></app-counter>-->
        <app-car>
            <h2 slot="h2">Mazda + {{carName}}</h2>
            <p slot="p">test</p>
        </app-car>
        <!--:counter="counter"

        :carName="carName"
                 :carYear="carYear" :changeFunc="changeName"

                 @counterUpdated="counter=$event"
                 @nameChanged="carName=$event"-->
    </div>
</template>

<script>
    import Car from './Car.vue'
    import Counter from './Counter.vue'

    export default {
        data() {
            return {
                carName: 'Ford',
                carYear: 2015,
                // counter: 0
            }
        },
        components: {
            appCar: Car,
            appCounter: Counter
        },
        // methods: {
        //     changeName: function () {
        //         this.carName = 'Audi';
        //     }
        // }
    }
</script>

<style>
    h2 {
        color: red;
    }
</style>
