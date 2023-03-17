<template>
  <header class="sticky-top">
    <nav class="navbar navbar-expand-lg bg-background">
      <div class="container">
        <RouterLink class="navbar-brand" to="/" @click="() => closeMenu ()">
          <img class="img-fluid d-inline d-lg-none" src="@/assets/images/logo.svg" alt="logo">
          <img class="img-fluid d-none d-lg-inline" src="@/assets/images/logo-lg.svg" alt="logo">
        </RouterLink>
        <div class="d-flex justify-content-center align-items-center">
          <RouterLink class="text-gray-dark me-4 d-lg-none" to="/carts" @click="() => closeMenu ()">
            <i class="fa-solid fa-cart-shopping icon position-relative">
              <span class="badge rounded-pill bg-dark position-absolute top-0 start-100 pill-number fw-medium">
                {{ cartNum > 0 ? (cartNum < 100 ? cartNum : '99+') : '' }}
              </span>
            </i>
          </RouterLink>
          <a class="navbar-toggler border-0 ps-0 btn hover-primary" role="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars icon text-gray-dark"></i>
            <i class="fa-solid fa-xmark icon text-gray-dark d-none"></i>
          </a>
        </div>
        <div class="collapse navbar-collapse justify-content-lg-end" id="menu" ref="menu">
          <div class="d-flex flex-column flex-lg-row justify-content-between menu">
            <ul class="navbar-nav align-items-center">
              <li class="nav-item">
                <RouterLink class="d-block py-3 text-gray-dark p-3 p-lg-2 hover-primary" to="/" @click="() => closeMenu ()">首頁</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="d-block py-3 text-gray-dark p-3 p-lg-2 hover-primary" to="/products" @click="() => closeMenu ()">購買花禮</RouterLink>
              </li>
              <!-- TODO -->
              <!-- <li class="nav-item">
                <RouterLink class="d-block py-3 text-gray-dark p-3 p-lg-2 hover-primary" to="/courses" @click="() => closeMenu ()">花藝課程</RouterLink>
              </li> -->
              <!-- <li class="nav-item">
                <a class="d-block py-3 text-gray-dark p-3 p-lg-2 hover-primary" href="#" role="button" @click="() => closeMenu ()">我想客製</a>
              </li> -->
              <li class="nav-item">
                <RouterLink class="d-block py-3 text-gray-dark p-3 p-lg-2 hover-primary" to="/faq" role="button" @click="() => closeMenu ()">常見問題</RouterLink>
              </li>
              <li class="nav-item d-none">
                <a class="d-block py-3 text-gray-dark p-3 p-lg-2 hover-primary" href="#" role="button" @click="() => closeMenu ()">我的帳戶</a>
              </li>
            </ul>
            <div class="d-lg-flex justify-content-center align-items-center">
              <!-- TODO -->
              <!-- <p class="d-none d-lg-block m-0"> | </p>
              <button type="button" class="btn hover-primary py-3 px-4 text-gray-dark link-width border-0"
                @click="() =>openModal('login')">
                登入
              </button>
              <button type="button" class="btn btn-primary py-3 px-5 text-white link-width"
                @click="() =>openModal('register')">
                註冊
              </button> -->
              <!-- 購物車 電腦版 -->
              <CartDropdown ref="cartDropdown"></CartDropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <!-- Modal -->
    <LoginModal ref="loginModal" :action="action" @change-action="changeAction"></LoginModal>
  <!-- Modal -->
</template>

<script>
import { mapState } from 'pinia'
import cartStore from '@/stores/cart'
import Collapse from 'bootstrap/js/dist/collapse'
import CartDropdown from '@/components/CartDropdown.vue'
import LoginModal from '@/components/LoginModal.vue'
export default {
  data () {
    return {
      menuCollapse: '',
      action: ''
    }
  },
  methods: {
    openModal (action) {
      this.action = action
      this.$refs.loginModal.showModal()
    },
    changeAction (action) {
      this.action = action
    },
    closeMenu () {
      this.menuCollapse.hide()
    }
  },
  components: {
    CartDropdown,
    LoginModal
  },
  mounted () {
    this.menuCollapse = new Collapse(this.$refs.menu, {
      toggle: false
    })
  },
  computed: {
    ...mapState(cartStore, ['cartNum'])
  }
}
</script>
