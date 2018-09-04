import fb from 'firebase'
// создаем класс для вида нашей продукции
class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}
// vuex хранилище для продукции
export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    // при обновлении мы сначала через метод find найдем именно эту продукцию, и изменим ее title и description
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      // данная константа это pointer на обьект в массиве ads так что мы можем спокойно модифицировать его
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    // ассинхронный метод по созданию продукта, payload получает обьект ad
    async createAd ({commit, getters}, payload) {
      // стандартно очищаем ошибки, и ставим loading на true
      commit('clearError')
      commit('setLoading', true)

      // для того чтобы сохранить изображение мы используем хранилище firebase,
      // соответственно сначала нужно залить изображение и потом получить source который мы и сохраним в бд
      const image = payload.image
      let imageSrc = ''
      try {
        // создадим обьект класса Ad, пока с пустым imageSrc
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo)

        // заливаем в базу данных нашу продукцию
        const ad = await fb.database().ref('ads').push(newAd)

        // вытаскиваем extension у image
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        // заливаем в storage firebase изображение и получаем его в imagaData
        const imageData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)

        // получаем ссылку на изображение в хранилище
        imageSrc = await imageData.ref.getDownloadURL()

        // обновляем продукт добавляя ему imageSrc
        await fb.database().ref('ads').child(ad.key).update({
          imageSrc
        })
        // чистим loading
        commit('setLoading', false)
        // вызываем мутатор createAd чтобы добавить в state созданный продукт
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
      } catch (error) { // ловим ошибки
        // отправляем ошибку и чистим loading
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    // получаем все продукты для главной
    async fetchAds ({commit}, payload) {
      // стандартно очищаем ошибки, и ставим loading на true
      commit('clearError')
      commit('setLoading', true)
      // создаем массив продуктов
      const resultAds = []
      try {
        // получаем все продукты в виде обьекта где ключ id
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        // проходим по обьекту ads для каждого ключа
        Object.keys(ads).forEach(key => {
          // создаем продукт и добавляем в resultAds данный продукт
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.ownerId,
              ad.imageSrc,
              ad.promo,
              key
            )
          )
        })
        // пушим массив в мутатор loadAds
        commit('loadAds', resultAds)
        // чистим загрузку
        commit('setLoading', false)
      } catch (error) {
        // отправляем ошибку и чистим loading
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    // обновляем продукт
    async updateAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // обновляем по id продукт в базе данных
        await fb.database().ref('ads').child(id).update({
          title,
          description
        })
        // вызываем мутатор
        commit('updateAd', {title, description, id})
        commit('setLoading', false)
      } catch (error) {
        // отправляем ошибку и чистим loading
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    // получаем продукты с промо
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    // получаем продукты именно создавшего пользователя
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    // получаем продукт именно выбранный по id
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
