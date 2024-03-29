<template>
    <VueLoading :active="isLoading">
        <img class="img-fluid loading-img animate__animated animate__shakeY" src="@/assets/images/logo-lg.svg" alt="logo">
    </VueLoading>
    <main>
      <section class="bg-background py-5 min-height">
        <div class="container">
          <ul class="row row-cols-3 list-unstyled mb-5 text-center">
            <li class="col">
              <p class="mb-0 border border-gray-dark m-2 p-3">STEP 1<br />建立<br class="d-block d-lg-none"/>訂單</p>
            </li>
            <li class="col">
              <p :class="`mb-0 m-2 p-3 ${order.is_paid ? 'border border-gray-dark' : 'mb-0 bg-gray-dark text-white'}`">STEP 2<br />進行<br class="d-block d-lg-none"/>結帳</p>
            </li>
            <li class="col">
              <p :class="`mb-0 m-2 p-3 ${!order.is_paid ? 'border border-gray-dark' : 'mb-0 bg-gray-dark text-white'}`">STEP 3<br />訂單<br class="d-block d-lg-none"/>完成</p>
            </li>
          </ul>
          <div v-if="order.is_paid" class="d-flex flex-column justify-content-center align-items-center mb-4">
            <h2>訂購成功，感謝您的訂購</h2>
            <p>花禮均需要時間進行製作，製作天數約3~5天不等</p>
            <button type="button" class="btn btn-primary py-3 px-5 text-gray-dark"
              @click="$router.push('/products')">
              再去晃晃吧
            </button>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6 p-5">
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
                        {{ `NT$ ${$priceFormat.price(product.final_total)}` }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <p class="fs-5 text-end fw-bold" v-if="order.total">
                {{`總計金額：NT$ ${$priceFormat.price(order.total)}`}}
              </p>
            </div>
            <div class="col-12 col-lg-6 bg-white p-5" v-if="order.user">
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
              <div class="col-12 mt-5" v-if="!order.is_paid">
                  <button type="button" class="btn btn-primary py-3 px-5 text-gray-dark w-100"
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
import { Toast } from '@/methods/toast.js'
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
          Toast(err.response.data.message, 'error')
          this.isLoading = false
        })
    },
    // 付款
    payOrder () {
      this.isLoading = true
      const { orderId } = this.$route.params
      this.$http.post(`${VITE_API}/api/${VITE_APIPATH}/pay/${orderId}`)
        .then(res => {
          Toast(res.data.message, 'success')
          this.getOrder()
          this.isLoading = false
        })
        .catch(err => {
          Toast(err.response.data.message, 'error')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
