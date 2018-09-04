import store from '../store'
/* Тут мы сделаем проверку на то что пользователь зарегистрировался или нет, и экспортируем данную функцию
в router/index.js в свойство beforeEnter() */

export default function (to, from, next) {
  if (store.getters.user) { /* проверяем не равен ли Null в vuex state обьект user */
    next()
  } else {
    next('/login?loginError=true') /* передаем параметр loginError со значением true для того чтобы вывести ошибку */
  }
}
