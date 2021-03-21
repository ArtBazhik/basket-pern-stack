<template>
  <nav class="blue darken-4">
    <div class="nav-wrapper">
      <router-link class="brand-logo left" :to="{ name: 'Home' }"
      >Cart App
      </router-link
      >
      <ul class="right">
        <li>
          <router-link :to="{ name: 'Home' }">Каталог</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Cart' }">Корзина <span>({{getProductCart.length}})</span></router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {computed} from 'vue'
import store from '../../store/index'

export default {
  name: "v-header",
  computed: {
    getProductCart () {
      return this.$store.getters.CART
    }
  }
  // super() {
  //   let cart = computed(() => {
  //     return store.state.cart
  //   })
  //
  //   return {
  //     cart
  //   }
  // }
};
</script>
