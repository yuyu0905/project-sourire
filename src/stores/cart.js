import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

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
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err.response.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    // 加入購物車
    addCart (productId, qty = 1) {
      this.loadingItem = productId
      axios.post(`${VITE_API}/api/${VITE_APIPATH}/cart`, {
        data: { product_id: productId, qty }
      })
        .then(res => {
          this.getCart()
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadingItem = ''
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err.response.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    // 刪除購物車項目（單一）
    delCart (id) {
      this.loadingItem = id
      axios.delete(`${VITE_API}/api/${VITE_APIPATH}/cart/${id}`)
        .then(res => {
          this.getCart()
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
          const cartMenu = document.querySelector('.cart-menu')
          if (cartMenu) {
            cartMenu.classList.remove('show')
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err.response.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    // 刪除購物車項目（全部）
    delCars () {
      axios.delete(`${VITE_API}/api/${VITE_APIPATH}/carts`)
        .then(res => {
          this.getCart()
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadingItem = ''
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err.response.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
        })
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
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadingItem = ''
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err.response.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
})

export default cartStore
