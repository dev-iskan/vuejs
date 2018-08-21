<template>
    <div id="app">
        <h2>Form inputs</h2>
        <!-- textarea lesson <textarea v-model="textarea" name="" id="" cols="30" rows="10"></textarea>
         <p>{{textarea}}</p>-->

<!-- checkbox lesson        <label for="">
            <input type="checkbox" value="vk" v-model="social"> Vk
        </label>
        <label for="">
            <input type="checkbox" value="facebook" v-model="social"> Facebook
        </label>
        <label for="">
            <input type="checkbox" value="instagram" v-model="social"> Instagram
        </label>-->

<!--  radio lesson      <label for="">
            <input type="radio" value="vk" v-model="social"> Vk
        </label>
        <label for="">
            <input type="radio" value="facebook" v-model="social"> Facebook
        </label>
        <label for="">
            <input type="radio" value="instagram" v-model="social"> Instagram
        </label>-->
      <!-- checkbox lesson <ul>
            <li v-for="item in social">{{item}}</li>
        </ul>-->
        <!-- radio lesson <p>{{social}}</p>-->


<!-- select lesson       <select v-model="defaultSocial">
            <option v-for="item in socialList">{{item}}</option>
        </select>-->

        <!--<input type="number" v-model.number="age">

        <p>{{age}}</p>-->

        <onoff v-model="switched"></onoff>
        <div>
            <h3 v-if="switched">Component is enabled</h3>
            <h3 v-else>Component is disabled</h3>
        </div>
    </div>
</template>

<script>
    import Onoff from './Onoff.vue'
    export default {
        name: 'app',
        data() {
            return {
                textarea: 'Initial string',
                // social: []   checkbox
                // social: ''  radio
                /*socialList: ['instagram', 'vk', 'facebook'],
                defaultSocial: 'facebook',*/
                age: 20,
                switched: false
            }
        },
        watch: {
            age(value) {
                console.log(value);
            }

        },
        components: {
            Onoff
        }
    }
</script>

<style scoped>
    textarea {
        height: 100px;
        width: 400px;
    }

    p {
        white-space: pre;
    }
</style>