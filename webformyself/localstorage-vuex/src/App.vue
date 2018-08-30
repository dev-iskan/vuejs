<template>
  <div id="app" class="container text-center pt-5">
    <app-counter :counter="counter"></app-counter>
    <app-actions @counterUpdated="counter+=$event"></app-actions>
  </div>
</template>

<script>
import Counter from './Counter.vue';
import Action from './Action.vue';
export default {
  name: 'app',
  data () {
    return {
      counter: 0
    };
  },
  components: {
      appCounter: Counter,
      appActions: Action
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
