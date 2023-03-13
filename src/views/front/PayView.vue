<template>
    <VueLoading :active="isLoading">
        <img class="img-fluid loading-img animate__animated animate__shakeY" src="@/assets/images/logo-lg.svg" alt="logo">
    </VueLoading>
    <main>
      <section class="bg-background py-5 min-height">
        <div class="container">
          <ul class="row row-cols-3 list-unstyled mb-5 text-center">
            <li class="col">
              <p class="mb-0 border border-gray-dark m-2 p-3">STEP 1<br />建立訂單</p>
            </li>
            <li class="col">
              <p :class="`mb-0 m-2 p-3 ${order.is_paid ? 'border border-gray-dark' : 'mb-0 bg-gray-dark text-white'}`">STEP 2<br />結帳</p>
            </li>
            <li class="col">
              <p :class="`mb-0 m-2 p-3 ${!order.is_paid ? 'border border-gray-dark' : 'mb-0 bg-gray-dark text-white'}`">STEP 3<br />訂單完成</p>
            </li>
          </ul>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h2>{{ order.is_paid ? '訂購完成' : '訂單內容' }}</h2>
              <table class="table table-hover align-middle text-center text-gray-dark">
                <thead>
                  <tr>
                    <th colspan="2">商品</th>
                    <th>數量</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in order.products" :key="product.id">
                    <td>
                        <img class="cart-img" :src="product.product.imageUrl" :alt="product.product.imageUrl">
                    </td>
                    <td>
                        <p class="small mb-2 text-start">{{ product.product.set }}<br />{{ product.product.title }}</p>
                    </td>
                    <td>
                        {{ product.qty }}
                    </td>
                    <td>
                        {{ `NT$ ${product.final_total}` }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <p class="fs-5 text-end fw-bold">
                {{`總計金額：NT$ ${order.total}`}}
              </p>
            </div>
            <div class="col-12 col-lg-6" v-if="order.user">
              <h2>訂購資訊</h2>
              <div class="row my-3">
                  <p class="col-4 mb-0">Email</p>
                  <p class="col-8 mb-0">{{ order.user.email }}</p>
              </div>
              <div class="row my-3">
                  <p class="col-4 mb-0">收件人姓名</p>
                  <p class="col-8 mb-0">{{ order.user.name }}</p>
              </div>
              <div class="row my-3">
                  <p class="col-4 mb-0">電話</p>
                  <p class="col-8 mb-0">{{ order.user.tel }}</p>
              </div>
              <div class="row my-3">
                  <p class="col-4 mb-0">收件人地址</p>
                  <p class="col-8 mb-0">{{ order.user.address }}</p>
              </div>
              <div class="row my-3">
                  <p class="col-4 mb-0">留言</p>
                  <p class="col-8 mb-0">{{ order.user.message }}</p>
              </div>
              <div class="text-end mt-5" v-if="!order.is_paid">
                  <button type="button" class="btn btn-primary py-3 px-5 text-white w-100"
                    @click="payOrder">
                    付款
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  data () {
    return {
      isLoading: false,
      order: {}
    }
  },
  methods: {
    // 取得訂單
    getOrder () {
      this.isLoading = true
      const { orderId } = this.$route.params
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/order/${orderId}`)
        .then(res => {
          this.order = res.data.order
          this.isLoading = false
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
          this.isLoading = false
        })
    },
    // 付款
    payOrder () {
      this.isLoading = true
      const { orderId } = this.$route.params
      this.$http.post(`${VITE_API}/api/${VITE_APIPATH}/pay/${orderId}`)
        .then(res => {
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500
          })
          this.getOrder()
          this.isLoading = false
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
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
