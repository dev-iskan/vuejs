<template>
  <div class="container text-center pt-5">
    <button class="btn btn-success" @click="add">Add</button>
    <button class="btn btn-danger" @click="remove">Remove</button>
    <hr>
    <transition-group class="list-group width300" tag="ul" name="ma" :duration="700">
      <li class="list-group-item" v-for="item in items" :key="item">{{item}}</li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [1,2,3,4,5],
        nextNumb: 6
      }
    },

    methods: {
      getIndex () {
        return Math.floor(Math.random() * this.items.length)
      },

      add () {
        this.items.splice(this.getIndex(), 0, this.nextNumb++)
      },
      remove () {
        this.items.splice(this.getIndex(),1)
      }
    }
  }
</script>

<style scoped>
 .width300 {
   width: 300px;
   margin: 0 auto
 }

 .ma-enter-active, .ma-leave-active {
   transition: 1s all
 }
  .ma-enter, .ma-leave-to {
    transform: translateX(-300px)
  }
</style>