<template>

  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <!-- Выравнивание по строке -->
        <v-flex xs12>
          <!-- карусель для отображения продуктов у которых есть статус promo -->
          <v-carousel>
            <v-carousel-item v-for="ad in promoAds" :key="ad.id" :src="ad.imageSrc">
              <div class="link">
                <v-btn class="error" :to="'/ad/'+ad.id">{{ad.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

  <!-- отображаем продукты в виде списка -->
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="ad in ads" :key="ad.id">
          <!-- проходим по циклу у ads -->
          <v-card>
            <v-img :src="ad.imageSrc" height="200px"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ad.title}}</h3>
                <div>{{ad.description}}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :to="'/ad/'+ad.id">Open</v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

    <!-- создаем спиннер пока ожидается загрузка продуктов-->
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular
            :size="100"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    computed: {
      promoAds () {
        return this.$store.getters.promoAds // подгружаем promo
      },
      ads () {
        return this.$store.getters.ads // подгружаем продукты
      },
      loading () {
        return this.$store.getters.loading // проверка идет ли загрузка
      }
    }
  }
</script>

<style scoped lang="stylus">
  .link 
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
</style>
