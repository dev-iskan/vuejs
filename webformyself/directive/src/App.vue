<template>
  <div>
    <h2 v-colored:background.font="'green'">{{msg}}</h2>
    <h2 v-colored:color.delay.font="'blue'">{{msg}}</h2>


    <!--lesson 5-->
    <!--<h2 v-colored:background="'green'">{{msg}}</h2>-->
    <!--<h2 v-colored:color="'blue'">{{msg}}</h2>-->

   <!--lesson 4-->
    <!--<h2 v-colored="'green'">{{msg}}</h2>-->

    <!--lesson 2-3-->
    <!--<h2 v-colored v-if="visible">{{msg}}</h2>-->
    <!--<button @click="visible = !visible">Press</button>-->
    <!--<button @click="msg = 'New Title'">Change Message</button>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
        // visible:true
    }
  }
}
</script>

<style scoped>
</style>
