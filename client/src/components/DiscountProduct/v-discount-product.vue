<template>
  <p>
    {{ disProduct.name }}
  </p>
</template>

<script>
export default {
  name: "v-discount-product",
  props: {
    disProduct: { type: Object, required: true },
  },
};
</script>
