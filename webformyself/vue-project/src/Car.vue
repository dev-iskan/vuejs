<template>
    <!--<div class="car">
        <h3>Name: {{carName}} \ {{reverseName}}</h3>
        <p>Year: {{carYear}}</p>
        <button @click="changeName">Изменить имя</button>
        <button @click="changeFunc">Изменить имя от родителя</button>
        <button @click="updateCounter">Добавить в счетчик</button>
    </div>-->

<!--    <div>
        <h2>Car</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, numquam?</p>
    </div>-->

    <div>
        <slot name="h2"></slot>
        <hr>
        <hr>
        <slot name="p"></slot>
    </div>
</template>

<script>
    import {eventEmitter} from "./main";

    export default {
        /*props: [
            'carName'
        ],*/
        // props: {
        //     carName: {
        //         type: String,
        //         required: true,
        //         default: 'Toyota'
        //     },
        //     carYear: Number,
        //     changeFunc: Function
        //     // counter: Number
        // },
        // computed: {
        //     reverseName() {
        //         return this.carName.split('').reverse().join('');
        //     }
        // },
        // methods: {
        //     changeName: function () {
        //         this.carName='Mazda';
        //         this.$emit('nameChanged', this.carName);
        //     },
        //
        //     updateCounter: function () {
        //         // this.$emit('counterUpdated', this.counter+1)
        //         eventEmitter.$emit('counterUpdated', 3);
        //     }
        // }
    }
</script>

<style scoped>
    /*.car {*/
        /*border: 1px solid black;*/
    /*}*/
    /*.car h3 {*/
        /*margin-bottom: 5px;*/
    /*}*/

    div {
        border: 1px solid black;
    }
    p {
        color: blue;
    }
</style>