<template>
    <div class="dropdown">
        <a class="btn hover-primary text-gray-dark py-3 px-4 d-none d-lg-block border-0" href="#" role="button"
          id="cart" data-bs-toggle="dropdown" aria-expanded="false" ref="cartDropdown" data-bs-auto-close="outside">
          <i class="fa-solid fa-cart-shopping icon position-relative">
          <span class="badge rounded-pill bg-dark position-absolute top-0 start-100 pill-number fw-medium">
            {{ cartNum > 0 ? (cartNum < 100 ? cartNum : '99+') : '' }}
          </span>
          </i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg-end p-3 cart-menu" aria-labelledby="cart">
          <a class="text-gray-dark hover-primary text-decoration-underline d-block text-end small"
            role="button" @click="delCars()">清空購物車
          </a>
          <h6 class="text-center text-muted"> — 已加入商品 — </h6>
          <div class="cart-list">
            <CartList></CartList>
          </div>
          <template v-if="cart.carts && cart.carts.length > 0">
            <p class="fs-6 text-end fw-bold">{{`總計金額：NT$ ${cart.final_total}`}}</p>
            <div class="d-flex justify-content-center mb-2">
                <a class="btn btn-primary py-2 px-5 text-white link-width" role="button" @click="goCarts()">前往結帳</a>
            </div>
          </template>
          <div class="d-flex flex-column justify-content-center align-items-center mt-4" v-else>
            <p><i class="fa-solid fa-cart-shopping mb-2 me-2 fs-5"></i>購物車內沒有商品</p>
            <a class="btn btn-primary py-2 px-5 text-white link-width" role="button" @click="goProducts()">再去晃晃吧</a>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cart'
import Dropdown from 'bootstrap/js/dist/dropdown'
import CartList from '@/components/CartList.vue'
export default {
  data () {
    return {
      cartDropdown: ''
    }
  },
  components: {
    CartList
  },
  methods: {
    ...mapActions(cartStore, ['delCars']),
    goCarts () {
      this.cartDropdown.hide()
      this.$router.push('/carts')
    },
    goProducts () {
      this.cartDropdown.hide()
      this.$router.push('/products')
    }
  },
  mounted () {
    this.cartDropdown = new Dropdown(this.$refs.cartDropdown, { autoClose: 'outside' })
  },
  computed: {
    ...mapState(cartStore, ['cart', 'cartNum'])
  }
}
</script>
