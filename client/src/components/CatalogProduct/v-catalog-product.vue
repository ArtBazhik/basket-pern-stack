<template>
  <div class="row product-card">
    <div class="col s4">
      <p
          style="text-transform: capitalize; margin-bottom: 0; font-weight: bold"
      >
        {{ product.name }}
      </p>
      <p style="margin: 0">Арт. {{ product.id }}</p>
    </div>
    <div class="col s4">
      <p>{{ product.price }}</p>
    </div>
    <div class="col s4 center">
      <button
          style="font-weight: bold"
          class="btn btn-small green waves-teal waves-effect"
          @click.exact="handleDeleteProduct(product)"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-catalog-product",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Пользовательское события
    handleDeleteProduct(product) {
      this.$store.dispatch('putProductToCart', product)
    },
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  padding-bottom: 10px;
  border-bottom: 1px solid gray;

  &:last-child {
    border-bottom: none;
  }
}
</style>
