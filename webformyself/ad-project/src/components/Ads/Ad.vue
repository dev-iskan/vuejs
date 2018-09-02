<template>
  <v-container>
    <v-layout row>
      <!-- Выравнивание по строке -->
      <v-flex xs12>
        <!--  -->
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc"></v-img>
          <v-card-text>
            <h1 class="text--primary"> {{ad.title}}</h1>
            <p> {{ad.description}} </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <edit-ad-modal :ad="ad" v-if="isOwner"></edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>

        <div class="text-xs-center" v-else>
          <v-progress-circular
            :size="100"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import EditAdModal from './EditAdModal'
  export default {
    props: ['id'],
    computed: {
      ad () {
        const id = this.id
        return this.$store.getters.adById(id)
      },

      loading () {
        return this.$store.getters.loading
      },

      isOwner () {
        return this.ad.ownerId === this.$store.getters.user.id
      }
    },
    components: {
      EditAdModal
    }
  }
</script>

<style scoped>

</style>
