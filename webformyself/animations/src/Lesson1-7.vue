/* You have to change name to App.vue */
<template>
  <div id="app" class="container text-center pt-5">
    <button class="btn btn-primary mb-5" @click="show = !show">Toggle</button>
   
  <!--   <transition 
    type="transition"
    :duration = "2000"
    :duration = "{enter: 1500, leave: 2000}"
    appear
    name="ma"> на каждом из 6 этапов он будет менять классы p --> <!-- преффикс my animation
      <p v-if="show">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, unde.</p>
    </transition> -->

    
    <!-- <transition
    enter-active-class="animated bounce"
    leave-active-class="animated pulse"
    >
      <p v-if="show">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, unde.</p>
    </transition> -->

  <!--   <transition name="ma" mode="out-in">
      <div class="alert alert-success" v-if="show" key="success">Success</div>
      <div class="alert alert-danger" v-else key="danger">Danger</div>
    </transition> -->

      <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"

       @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
      >
      <p v-if="show">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, unde.</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      show: false
    }
  },
  methods: {
    beforeEnter (el) {
      console.log("beforeEnter")
    },
    enter (el, done) //done функция которая должна выполниться когда анимация завершится
    {
      console.log("enter")
      done()
    },
    afterEnter (el) {
      console.log("afterEnter")
    },
    enterCancelled (el) {
      console.log("enterCancelled")
    },
    beforeLeave (el) {
      console.log("beforeLeave")
    },
    leave (el, done) {
      console.log("leave")
      done()
    },
    afterLeave (el) {
      console.log("afterLeave")
    },
    leaveCancelled (el) {
      console.log("leaveCancelled")
    }
  }
}
</script>

<style>
  .ma-enter {
    opacity: 0;
  } /* первый этап enter, именно начальное состояние */
  .ma-enter-active {
    transition: opacity 1s;
  } /* второй этап длится до тех пор пока элемент не появится */
  .ma-enter-to {} /* третий этап, состояние когда элемент уже появится в дереве */
  .ma-leave {} /* перед исчезновением элемента */
  .ma-leave-active {
    animation: 1s ma-slide forwards;
    transition: opacity 1s;
  } /* пока не исчезнет */
  .ma-leave-to {
    opacity: 0;
  } /* когда исчезнет */


  @keyframes ma-slide {
    from {
      transform: translateX(0px);
    } 
    to {
      transform: translateX(-100px);
    }   
  }
</style>
