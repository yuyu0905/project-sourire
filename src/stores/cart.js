import { defineStore } from 'pinia'
import axios from 'axios'
import { Toast } from '@/methods/toast.js'

const { VITE_API, VITE_APIPATH } = import.meta.env
const cartStore = defineStore('cart', {
  state: () => {
    return {
      cart: {},
      cartNum: 0,
      loadingItem: '' // 存 ID
    }
  },
  actions: {
    // 購物車列表
    getCart () {
      axios.get(`${VITE_API}/api/${VITE_APIPATH}/cart`)
        .then(res => {
          this.cart = res.data.data
          this.cartNum = res.data.data.carts.reduce((acc, cart) => acc + cart.qty, 0)
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },
    // 加入購物車
    addCart (productId, qty = 1) {
      this.loadingItem = productId
      axios.post(`${VITE_API}/api/${VITE_APIPATH}/cart`, {
        data: { product_id: productId, qty }
      })
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },
    // 刪除購物車項目（單一）
    delCart (id) {
      this.loadingItem = id
      axios.delete(`${VITE_API}/api/${VITE_APIPATH}/cart/${id}`)
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          const cartMenu = document.querySelector('.cart-menu')
          if (cartMenu) {
            cartMenu.classList.remove('show')
          }
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },
    // 刪除購物車項目（全部）
    delCars () {
      axios.delete(`${VITE_API}/api/${VITE_APIPATH}/carts`)
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    },
    // 調整購物車產品數量
    updateCart (data) {
      this.loadingItem = data.id
      axios.put(`${VITE_API}/api/${VITE_APIPATH}/cart/${data.id}`, {
        data: {
          product_id: data.product_id,
          qty: data.qty
        }
      })
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => Toast(err.response.data.message, 'error'))
    }
  }
})

export default cartStore
