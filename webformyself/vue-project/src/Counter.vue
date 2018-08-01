<template>
    <!--<h1>Counter - {{counter}}</h1>-->
    <div>
        <h2>Counter</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, laboriosam.</p>
    </div>
</template>

<script>
import {eventEmitter} from "./main";

export default {
    // props: ['counter']
    // data() {
    //     return {
    //         counter: 0
    //     }
    // },
    // created(){
    //     eventEmitter.$on('counterUpdated', (num) => {
    //         if(num){
    //             this.counter+=num;
    //         }
    //         else {
    //             this.counter++;
    //         }
    //     })
    // }
}
</script>

<style scoped>
    h2 {
        color: red;
    }
</style>