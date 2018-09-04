<template>
  <v-container>
    <v-layout row>
      <!-- добавляем спиннер для заказов -->
      <v-flex xs12 class="text-xs-center pt-5" v-if = "loading">
          <v-progress-circular
            :size="100"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
      </v-flex>
      <!-- Выравнивание по строке если нету загрузки и есть какие нибудь заказы то отображаем-->
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list two-line subheader v-for="order in orders" :key="order.adId">
          <v-list-tile avatar>
            <v-list-tile-action>
              <!-- при нажатии на чекбокс мы вызываем метод markDone который обозначит данный заказ как принятый -->
              <v-checkbox color="success" @change="markDone(order)" :input-value="order.done"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn class="primary" :to="'/ad/'+order.adId">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      <!-- в ином случае если нету загрузки и нету вообще заказов нам отобразится данный flex -->
      </v-flex>
       <v-flex xs12 class="text-xs-center" v-else>
          <h1 class="text--secondary">You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      },

      orders () {
        return this.$store.getters.orders
      }
    },
    methods: {
      markDone (order) {
        this.$store.dispatch('markOrderDone', order.id) // диспатчим данный метод
        .then(() => {
          order.done = true // при resolve обозначаем чекбокс как checked
        })
        .catch()
      }
    },
    created () {
      this.$store.dispatch('fetchOrders') // при создании vue подгружаем все заказы
    }
  }
</script>

<style scoped>

</style>
