<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <!-- центрирует вертикали и горизонтали -->
      <v-flex xs12 sm8 md6>
        <!--  -->
        <v-card class="elevation-12">
          <!-- классы которые добавляют box-shadow -->

          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <!-- секция инпутов  биндим password и email-->
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field prepend-icon="person" name="email" label="Email" type="email" v-model="email" :rules="emailRules"
                validate-on-blur></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" type="password" :counter="6" v-model="password"
                :rules="passwordRules" validate-on-blur></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <!-- секция где находятся кнопки -->
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid || loading" :loading="loading" @click="onSubmit">Login</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const emailRegEx = /.+@.+/
  export default {
    data () {
      return {
        email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => emailRegEx.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be equl or more than 6 characters'
        ]
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('loginUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch()
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in to access this page!')
      }
    }
  }
</script>

<style scoped>

</style>
