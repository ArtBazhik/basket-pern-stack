import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        products: [],
        cart: []
    },
    mutations: {
        // Полученные товары созраняем в хранилище Vuex
        getAllProducts(state, payload) {
            state.products = payload
        },

        // Получение товары из корзины БД сохраняем в хранилище Vuex
        getAllProductsFromCart(state, payload) {
            state.cart = payload
        },

        // Отправка товара в корзину БД
        async postProductToCart(state, payload) {
            const {id, price, qty, discount} = payload
            await axios.post('/api/cart', {
                productId: id,
                total_price: price,
                qty: qty,
                discount: discount
            })
        }

    },
    actions: {
        // Получени из БД каталог товаров и передача
        async getAllProducts(context) {
            const products = await axios.get('/api/products').then(res => res.data)
            context.commit('getAllProducts', products)
        },

        // Получение из БД список товаров корзины
        async getAllProductsFromCart(context) {
            const cartProducts = await axios.get('/api/cart').then(res => {
                if (res.data) {
                    return res.data
                }
            }).catch(e => console.log(e))
            context.commit('getAllProductsFromCart', cartProducts)
        },
    },
    getters: {
        PRODUCTS: state => state.products,
        CART: state => state.cart
    }
})
