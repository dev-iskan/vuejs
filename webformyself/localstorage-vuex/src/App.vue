<template>
  <div id="app" class="container text-center pt-5">
    <app-counter></app-counter>
    <app-second-counter></app-second-counter>
    <hr>
    <app-actions></app-actions>
  </div>
</template>

<script>
import Counter from './Counter.vue';
import Action from './Action.vue';
import SecondCounter from './SecondCounter.vue';
export default {
  name: 'app',
  components: {
      appCounter: Counter,
      appActions: Action,
      appSecondCounter: SecondCounter
  }

}
</script>

<style scoped>
</style>
