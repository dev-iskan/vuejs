<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/new" class="info">Organize Meetups</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
        <v-carousel-item
          v-for="meetup in meetups"
          :key="meetup.id"
          :src="meetup.imageUrl"
          @click="onLoadMeetup(meetup.id)"
        >
          <div class="title">{{meetup.title}}</div>
        </v-carousel-item>
      </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join Meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    methods: {
      onLoadMeetup (id) {
        this.$router.push(`/meetups/${id}`)
      }
    },
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, .5);
  color: white;
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
