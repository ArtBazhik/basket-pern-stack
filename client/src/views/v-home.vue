<template>
  <section>
    <h1>
      Каталог
    </h1>
    <v-catalog-product type v-for="product in products" :key="product.id" :product="product"/>
  </section>

</template>
<script>
import {computed} from 'vue'
import store from '../store/index'
import VCatalogProduct from "../components/CatalogProduct/v-catalog-product";

export default {
  name: "v-home",
  components: {VCatalogProduct},
  setup() {

    const products = computed(() => {
      return store.state.products
    })
    return {
      products
    }
  },
  mounted() {
    this.$store.dispatch('getAllProducts')
    this.$store.dispatch('getAllProductsFromCart')
  }
};
</script>
