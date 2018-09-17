<template>
  <v-dialog width="350px" persistent v-model="dialog">
    <v-btn fab slot="activator" accent>
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
              ></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                required
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="dialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
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
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          title: this.editedTitle,
          discription: this.editedDescription
        })
        this.dialog = false
      }
    }
  }
</script>

<style scoped>

</style>
