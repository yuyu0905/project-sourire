<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-gray-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/admin/products">後台</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/admin/products">產品列表</RouterLink>
          <RouterLink class="nav-link" to="/admin/orders">訂單列表</RouterLink>
          <RouterLink class="nav-link" to="/admin/coupons">優惠券</RouterLink>
          <RouterLink class="nav-link" to="/">回前台</RouterLink>
          <a href="#" class="nav-link" @click.prevent="logout">登出</a>
        </div>
      </div>
    </div>
  </nav>
  <RouterView v-if="checkSuccess"></RouterView>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_API } = import.meta.env

export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      this.$http.post(`${VITE_API}/api/user/check`)
        .then(() => {
          // 驗證成功
          this.checkSuccess = true
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/login')
        })
    },
    logout () {
      document.cookie = 'sourire-token=;expires=;'
      Swal.fire({
        icon: 'success',
        title: '登出成功',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push('/')
    }
  },
  mounted () {
    // 取出 cookie 的 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)sourire-token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 加入 header
    this.$http.defaults.headers.common.Authorization = token
    if (token) {
      this.checkLogin()
    } else {
      Swal.fire({
        icon: 'error',
        title: '您尚未登入',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push('/login')
    }
  }
}
</script>
