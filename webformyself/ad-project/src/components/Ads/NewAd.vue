<template>
  <v-container>
    <v-layout row>
      <!-- Выравнивание по строке -->
      <v-flex xs12 sm6 offset-sm3>
        <!--  -->
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form v-model="valid" ref="form" class="mb-3 pl-2" lazy-validation>
          <v-text-field name="title" label="Add title" type="text" v-model="title" required :rules="[v => !!v || 'Title is required']"
            validate-on-blur></v-text-field>
          <v-textarea name="description" label="Ad description" type="text" v-model="description" :rules="[v => !!v || 'Description is required']"
            validate-on-blur></v-textarea>
        </v-form>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn class="warning" @click="triggerUpload">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input @change="onFileChange" ref="fileInput" type="file" style="display: none;" accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img :src="imageSrc" class="pl-2" height="100" v-if="imageSrc">
          </v-flex>
        </v-layout>
        <v-layout row pl-2>
          <v-flex xs12>
            <v-switch color="primary" label="Add to promo?" :v-model="promo"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn :disabled="!valid || !image || loading" :loading="loading" class="success" @click="createAd">Create Ad</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        description: '',
        valid: false,
        promo: false,
        image: null,
        imageSrc: ''
      }
    },
    methods: {
      createAd () {
        if (this.$refs.form.validate() && this.image) {
          const ad = {
            title: this.title,
            description: this.description,
            promo: this.promo,
            image: this.image
          }

          this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch()
        }
      },
      triggerUpload () {
        this.$refs.fileInput.click()
      },
      onFileChange () {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>
