<template>
 <!-- создаем модалку которая называется dialog и биндим modal параметр для того чтобы показывать -->
  <v-dialog width="400" v-model="modal">
     <!-- добавляем кнопку в родительский компонент при котором будет отображаться модалка через свойство slot="activator" -->
    <v-btn class="primary ml-3"  slot="activator">Buy</v-btn>
<!-- отображаемая модалка -->
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex >
            <v-card-title>
              <h1 class="text--primary">Do you want to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                label="Your name"
                type="text"
                v-model="name"
              ></v-text-field>

               <v-text-field
                name="phone"
                label="Your phone"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- добавляем Local loading для показания выполнения асинхронного запроса -->
              <v-btn :disabled="localLoading" flat @click="onCancel">Close</v-btn>
              <v-btn :disabled="localLoading" :loading="localLoading" flat class="success" @click="onSave">Buy it</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['ad'], // получаем продукт от родительского компонента
    data () {
      return {
        modal: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      onCancel () {
        this.name = ''
        this.phone = ''
        this.modal = false
      },
      onSave () { // проверяем валидацию и диспатчим createOrder получая промисс или resolve
        if (this.name !== '' && this.phone !== '') {
          this.localLoading = true
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          // после выполнения кода выше чистим наши поля и закрываем модалку
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.modal = false
            this.localLoading = false
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>