<template>
  <section>
    <h4>Корзина</h4>
    <div v-if="discountProduct.length > 0">
      <h5>Скидка</h5>
      <v-discount-product
        v-for="disProduct in discountProduct"
        :key="disProduct.id"
        :disProduct="disProduct"
      />
      <hr />
    </div>
    <div
      v-if="cart.length > 0"
      v-for="(product, idx) in cart"
      :key="product.productCartId"
      style="display: flex; justify-content: space-between; margin: 30px 0; align-items: center"
    >
      <strong style="margin-right: 10px">{{ idx + 1 }}.</strong>
      <span style="flex-basis: 25%;">{{ product.name }}</span>
      <span style="flex-basis: 25%;">{{ product.price * product.qty }}</span>
      <div style="flex-basis: 25%;">
        <button
          class="btn btn-small green waves-effect"
          @click="
            handleIncrementQty(
              product.qty,
              product.productCartId,
              product.price
            )
          "
        >
          +
        </button>
        <span style="margin: 0 10px">{{ product.qty }}</span>
        <button
          class="btn btn-small red waves-effect"
          @click="
            handleDecrementQty(
              product.qty,
              product.productCartId,
              product.price
            )
          "
        >
          -
        </button>
      </div>
      <div style="flex-basis: 25%; text-align: right">
        <button
          class="waves-effect btn btn-small red"
          style="font-weight: bold"
          @click="handleDeleteProduct(product.productCartId)"
        >
          удалить
        </button>
      </div>
    </div>
    <p v-else>Корзина пуста</p>
  </section>
</template>

<script>
import { computed } from "vue";
import store from "../store";
import VDiscountProduct from "../components/DiscountProduct/v-discount-product.vue";

export default {
  name: "v-cart",
  components: { VDiscountProduct },
  setup() {
    const cart = computed(() => {
      return store.state.cart.filter((i) => !i.isDefault);
    });

    const discountProduct = computed(() => {
      return store.state.discountProducts;
    });

    let handleDeleteProduct = (cartId) => {
      store.dispatch("removeProductFromCart", cartId);
    };

    let handleIncrementQty = (qty, productId, price) => {
      store.dispatch("handleIncrementQty", { qty, productId, price });
    };

    let handleDecrementQty = (qty, productId, price) => {
      store.dispatch("handleDecrementQty", { qty, productId, price });
    };

    return {
      cart,
      discountProduct,
      handleDeleteProduct,
      handleIncrementQty,
      handleDecrementQty,
    };
  },
  mounted() {
    store.commit("getCartProducts");
  },
};
</script>
