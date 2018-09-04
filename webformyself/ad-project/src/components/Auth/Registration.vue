<template>
  <!-- страница логина -->

  <!-- помещаем все в контейнер с аттрибутом fluid fill-height для того чтобы он был респонсив и дочерние
  элементы полностью заполняли пространство внутри -->
  <v-container fluid fill-height>

<!-- центрирует вертикали и горизонтали -->
    <v-layout align-center justify-center>

      <!-- v-flex с аттрибутами ниже делает нашу страницу респонсив -->
      <v-flex xs12 sm8 md6>
        
        <!-- компонент в котором будет храниться форма elevaton - классы которые добавляют box-shadow-->
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <!-- секция инпутов  биндим password и email также добавляем нативную валидацию от vuetify через аттрибут :rules-->
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field prepend-icon="person" name="email" label="Email" type="email" v-model="email"
                validate-on-blur :rules="emailRules"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" type="password" :counter="6" v-model="password"
                validate-on-blur :rules="passwordRules"></v-text-field>
              <v-text-field prepend-icon="lock" name="confirm-password" label="Password" type="password" :counter="6"
                validate-on-blur v-model="confirmPassword" :rules="confirmPasswordRules"></v-text-field>
              <!-- validate-on-blur убираем агрессивную валидацию -->
            </v-form>
          </v-card-text>

          <v-card-actions>
            <!-- секция где находятся кнопки -->
            <v-spacer></v-spacer>
            <!-- кнопка будет отключена пока не пройдет валидация, также добавляем аттрибут loading, для 
            создания спинера внутри кнопки -->
            <v-btn color="primary" :disabled="!valid || loading" @click="onSubmit" :loading="loading">Create account</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const emailRegEx = /.+@.+/ // правило RegEx для валидации email
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        valid: false, // дефолтное состояние валидации
        emailRules: [ // массив хранящий все проверки на валидность v означает value в input которое проверяем
          v => !!v || 'E-mail is required',
          v => emailRegEx.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be equl or more than 6 characters'
        ],
        confirmPasswordRules: [
          v => !!v || 'Password is required',
          v => v === this.password || 'Passwords doesn\'t match'
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
          this.$store.dispatch('registerUser', user) // диспатчим registerUser акшен
            .then(() => {
              this.$router.push('/')
            })
            .catch()
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading // если выполняется загрузка получаем ее для отображения спинера
      }
    }
  }
</script>

<style scoped>

</style>
