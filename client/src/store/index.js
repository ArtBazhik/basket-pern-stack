import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    cart: [],
  },
  plugins: [createPersistedState()],
  mutations: {
    // Полученные товары созраняем в хранилище Vuex
    getAllProducts(state, payload) {
      state.products = payload;
    },

    // Добавление товара в корзину
    async putProductToCart(state, payloads) {
      const { id, qty, price, discount } = payloads;
      await axios
        .post("/api/cart", {
          productId: id,
          price,
          qty,
          discount,
        })
        .then((res) => {
          state.cart.push({
            ...payloads,
            isDelete: res.data.is_delete,
            productCartId: res.data.id,
          });
        });
    },

    // Удаление товара из корзины
    removeProductFromCart(state, payloads) {
      state.cart.map((i) => {
        if (i.productCartId === payloads) {
          state.cart.splice(i, 1);
          axios.delete(`/api/cart?idCartProduct=${payloads}`).then();
        }
      });
    },

    getCartProducts(state, payloads) {},

    // Увеличение кол-ва товара в корзине
    incrementQty(state, payloads) {
      let { qty, productId, price } = payloads;
      state.cart.map((i) => {
        if (i.qty >= 0) {
          if (productId === i.productCartId) {
            i.qty += 1;
            axios
              .put(
                `/api/cart?qty=${i.qty}&price=${price}&idCartProduct=${productId}`
              )
              .then((res) => console.log(res.data));
          }
        }
      });
    },

    // Уменьшение кол-ва товара в корзине
    decrementQty(state, payloads) {
      let { qty, productId, price } = payloads;
      if (qty > 1) {
        state.cart.map((i) => {
          if (productId === i.productCartId) {
            i.qty -= 1;
            axios
              .put(
                `/api/cart?qty=${i.qty}&price=${price}&idCartProduct=${productId}`
              )
              .then((res) => console.log(res.data));
          }
        });
      }
    },
  },
  actions: {
    // Получени из БД каталога товаров
    async getAllProducts(context) {
      const products = await axios.get("/api/products").then((res) => res.data);
      context.commit("getAllProducts", products);
    },

    // Добавление товара в корзину
    putProductToCart({ commit }, payloads) {
      commit("putProductToCart", payloads);
    },

    // Удаление товара из корзины
    removeProductFromCart({ commit }, payloads) {
      commit("removeProductFromCart", payloads);
    },

    // Получение товаров из корзины БД
    getCartProducts({ commit }) {
      let cartProducts;
      axios.get("/api/cart").then((res) => {
        cartProducts = res.data;
        commit("getCartProducts", cartProducts);
      });
    },

    // Увеличение товара на 1
    handleIncrementQty({ commit }, payloads) {
      commit("incrementQty", payloads);
    },

    // Уменьшение товара на 1
    handleDecrementQty({ commit }, payloads) {
      commit("decrementQty", payloads);
    },
  },
  getters: {
    PRODUCTS: (state) => state.products,
    CART: (state) => state.cart,
  },
});
