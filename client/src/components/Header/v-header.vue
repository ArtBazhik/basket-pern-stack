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
          <router-link :to="{ name: 'Cart' }">Корзина <span>({{countProductsInCart}})</span></router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: "v-header",
  computed: {
    countProductsInCart () {
      return this.$store.getters.CART.length
    }
  }
};
</script>
