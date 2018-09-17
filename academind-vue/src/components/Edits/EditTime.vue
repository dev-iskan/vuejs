<template>
  <v-dialog width="350px" persistent v-model="dialog">
    <v-btn slot="activator" accent>
      Edit Time
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template>
                <v-btn flat class="blue--text darken-1" @click="dialog = false">Close</v-btn>
                <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        dialog: false,
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)

        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          date: newDate
        })
        this.dialog = false
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date).toTimeString().slice(0, 5)
    }
  }
</script>

<style scoped>

</style>
