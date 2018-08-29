<template>
    <div>
        <h1>Car id {{id}}</h1>
        <button class="btn btn-sm btn-default mb-2" @click="goBackToCars">Back</button>
        <br>
        <router-link class="btn btn-sm btn-info mt-2"
                     tag="button"
                    :to="{name: 'CarFull', params: {id: id}, query: {name: 'Mazda', year: 2000}, hash: '#scroll'}"
        >Full info</router-link>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // id: this.$router.currentRoute.params['id']  либо так либо как снизу
                id: this.$route.params['id']
            }
        },
        watch: {
            $route(toR, fromR) {
                this.id = toR.params['id']
            }
        },
        methods: {
            goBackToCars(){
                this.$router.push('/cars')
            }
        },
        beforeRouteLeave(to, from, next){
            if(window.confirm('Are you sure want to leave?')){
                next(true);
            }
            else{
                next(false);
            }
        }
    }
</script>