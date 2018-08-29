<template>
<div>
    <h4>Car name: {{ this.$route.query['name']}}</h4>
    <h5>Car year: {{ year}}</h5>

    <div class="scroll"></div>
    <h6 id="scroll">Hello from the bottom</h6>
    <div class="scroll"></div>
</div>
</template>

<script>
export default {
    computed: {
        year(){
            return  this.$route.query.year;
        }
    },
    beforeRouteEnter(to, from, next){
        next(true);
    }
}
</script>

<style>
.scroll {
    width: 100px;
    height: 1000px;
    background: #ccc;
}
</style>