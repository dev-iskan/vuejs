<template>
  <v-app>
  <v-navigation-drawer 
  app 
  temporary
  v-model="drawer" 
  >
  <v-list> <!-- создаем List в drawer -->
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

  <v-toolbar dark color="primary">
    <!-- добавляем класс hidden-md-and-up который позволяет скрывать элементы при определенных размерах
    в нашем случае нужно скрывать иконку дровера при размере больше среднего -->
    <v-toolbar-side-icon
    @click="drawer = !drawer"
    class="hidden-md-and-up" 
    ></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">
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
  <v-content>
      <router-view></router-view>
  </v-content>
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
      drawer: false
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogOut () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
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
