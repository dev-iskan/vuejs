<template>
  <!-- создаем модалку которая называется dialog и биндим modal параметр для того чтобы показывать -->
  <v-dialog width="400" v-model="modal">
    <!-- добавляем кнопку в родительский компонент при котором будет отображаться модалка через свойство slot="activator" -->
    <v-btn class="warning mr-3"  slot="activator">Edit</v-btn>
    <!-- отображаемая модалка -->
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex >
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>

               <v-textarea
                name="description"
                label="Description"
                type="text"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn flat class="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['ad'], // получаем от родительского компонента данный продукт и его свойства
    data () {
      return {
        modal: false,
        editedTitle: this.ad.title,
        editedDescription: this.ad.description
      }
    },
    methods: {
      onCancel () { // закрываем модалку и чистим свойства
        this.title = this.ad.title
        this.editedDescription = this.ad.description
        this.modal = false
      },
      onSave () { // сохраняем изменения вызывая updateAd экшн
        if (this.editedTitle !== '' && this.editedDescription !== '') { // мини валидация
          this.$store.dispatch('updateAd', {
            title: this.editedTitle,
            description: this.editedDescription,
            id: this.ad.id
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>