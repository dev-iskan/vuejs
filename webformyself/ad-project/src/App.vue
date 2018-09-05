<template>
   <!-- основной layout -->
  <v-app>
   
     <!-- app аттрибут означает что drawer будет для всех страниц, temporary- говорит чтобы drawer
  скрывался, биндим на drawer чтобы открывать и скрывать -->
  <v-navigation-drawer 
  app 
  temporary
  v-model="drawer" 
  >
 
<!-- создаем List в drawer , проходим по loop для отображения всех ссылок, а через 
  :to направляем на определенный роут-->
  <v-list> 
          <v-list-tile 
          v-for="link of links"
          :key="link.title"
          :to="link.url"
          >
            <v-list-tile-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>

          <!-- данный item у list нужен для выхода из аутентификации -->
          <v-list-tile 
            @click="onLogOut"
            v-if="isUserLoggedIn"
          >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>
  </v-navigation-drawer>

  <!-- toolbar наверху, даем ему темную цветовую схему-->
  <v-toolbar dark color="primary">

    <!-- добавляем класс hidden-md-and-up который позволяет скрывать элементы при определенных размерах
    в нашем случае нужно скрывать иконку дровера при размере больше среднего -->
    <v-toolbar-side-icon
    @click="drawer = !drawer"
    class="hidden-md-and-up" 
    ></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">
      <!-- добавляем роутер-линк на главную страницу -->
      <router-link tag="span" to="/" class="pointer">Ad application</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer> <!-- создает простаранство в тулбаре между левыми и правыми элементами -->
    
    <!-- и также скрывать иконки в тулбаре при размере меньше среднего -->
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
        v-for="link of links"
        :key="link.title"
        :to="link.url"
        flat>
          <v-icon left>{{link.icon}}</v-icon> <!-- в данном случае имя иконки содержит 2 слова, чтобы обьединить мы добавляем _ -->
          {{link.title}}
        </v-btn>
        <v-btn 
        @click="onLogOut"
        v-if="isUserLoggedIn"
        flat>
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <!-- в v-content будут подгужаться компоненты назначенные в router папке -->
  <v-content>
      <router-view></router-view>
  </v-content>

  <!-- здесь мы подключаем snackbar который будет отображать текст ошибок на любой из страниц -->
    <v-snackbar
        v-if="error"
        :multi-line="true"
        :timeout="+5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{error}}
        <v-btn
          dark
          flat
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false // свойство для отображения дровера
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError') // диспатчим акшен который будет очишать ошибки, чтобы спрятать snackbar
    },
    onLogOut () {
      this.$store.dispatch('logoutUser') // диспатчим акшен выхода из сессии
      this.$router.push('/') // автоматически перенаправлять на главную страницу при выходе из сессии
    }
  },
  computed: {
    error () { // данный getter нужен для отображения ошибок если таковы возникнут
      return this.$store.getters.error
    },
    isUserLoggedIn () { // getter для проверки сессии пользователя
      return this.$store.getters.isUserLoggedIn
    },
    links () { // массив из ссылок для отображения в toolbar и drawer
      if (this.isUserLoggedIn) { // если пользователь зарегистрирован то показываем определенный контент
        return [
        { title: 'Orders', icon: 'bookmark_border', url: '/orders' },
        { title: 'New ad', icon: 'note_add', url: '/new' },
        { title: 'My ads', icon: 'list', url: '/list' }
        ]
      }
      return [
        { title: 'Login', icon: 'lock', url: '/login' },
        { title: 'Registration', icon: 'face', url: '/registration' }
      ]
    }
  }
}
</script>

<style scoped>
.pointer{
  cursor: pointer;
}
</style>
