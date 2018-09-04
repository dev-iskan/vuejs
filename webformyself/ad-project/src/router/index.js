import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import NewAd from '@/components/Ads/NewAd'
import AdList from '@/components/Ads/AdList'
import Orders from '@/components/User/Orders'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import AuthGuard from './auth-guard'

/* Выше мы подключаем все необходимые компоненты, vue-router и т.д. @ указывает на корневую папку */

Vue.use(Router)

export default new Router({
  /* создаем массив из роутов, для каждого даем имя компонент, а также некоторые роуты защищаем от вхождения */
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true, /* props позволяет компонентам получать переменные переданные через url */
      name: 'ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard /* beforeEnter проверяет сначала данный guard */
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history' /* убираем # в url  */
})
