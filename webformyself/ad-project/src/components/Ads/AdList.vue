<template>
  <v-container>
    <!-- отображаем данный layout если нету загрузки или если вообще есть наши продукты -->
    <v-layout row v-if="!loading && myAds.length !== 0">
      <!-- Выравнивание по строке -->
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">My ads</h1>

        <v-card v-for="ad in myAds" :key="ad.id" class="mb-3 elevation-10">
          <v-layout>
            <v-flex xs4>
              <v-img :src="ad.imageSrc" height="160">
                </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/ad/'+ad.id">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>

      </v-flex>
    </v-layout>
    <!-- в противном случае показываем ниже -->
    <v-layout row v-else-if="!loading && myAds.length === 0">
      <v-flex xs12 class="text-xs-center">
        <h1 class="text--primary">You have no ads yet</h1>
      </v-flex>
    </v-layout>

    <!-- если идет загрузка показываем блок со спинером -->
    <v-layout row v-else>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
            :size="100"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      myAds () {
        return this.$store.getters.myAds
      },

      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
</style>
