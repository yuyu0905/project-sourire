<template>
    <VueLoading :active="isLoading">
        <img class="img-fluid loading-img animate__animated animate__shakeY" src="@/assets/images/logo-lg.svg" alt="logo">
    </VueLoading>
    <main>
      <section class="bg-background py-5 min-height">
        <div class="container">
          <ul class="row row-cols-3 list-unstyled mb-5 text-center">
            <li class="col">
              <p class="mb-0 bg-gray-dark text-white m-2 p-3">STEP 1<br />建立訂單</p>
            </li>
            <li class="col">
              <p class="mb-0 border border-gray-dark m-2 p-3">STEP 2<br />結帳</p>
            </li>
            <li class="col">
              <p class="mb-0 border border-gray-dark m-2 p-3">STEP 3<br />訂單完成</p>
            </li>
          </ul>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h2>確認訂單內容</h2>
              <CartList />
              <template v-if="cart.carts && cart.carts.length > 0">
                <hr />
                <div class="input-group mb-3 input-group-sm">
                  <input type="text" class="form-control" placeholder="已套用優惠券" disabled v-if="cart.final_total !== cart.total">
                  <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠券" v-else />
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" :disabled="cart.final_total !== cart.total || loadingItem != ''"
                      type="button" @click="addCouponCode">
                      <i class="fas fa-spinner fa-pulse" v-if="loadingItem != ''"></i>
                      套用優惠碼
                    </button>
                  </div>
                </div>
                <p class="fs-5 text-end fw-bold" :class="cart.final_total !== cart.total ? 'text-muted text-decoration-line-through' : ''">
                  {{`總計金額：NT$ ${cart.total}`}}
                </p>
                <p class="fs-5 text-end fw-bold mb-4" v-if="cart.final_total !== cart.total">
                  {{`折扣後金額：NT$ ${cart.final_total}`}}
                </p>
              </template>
              <div class="d-flex flex-column justify-content-center align-items-start mt-4" v-else>
                <p><i class="fa-solid fa-cart-shopping mb-2 me-2 fs-5"></i>購物車內沒有商品</p>
                <a class="btn btn-primary py-3 px-5 text-white" role="button" @click="() => $router.push('/products')">再去晃晃吧</a>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <h2>訂購資訊</h2>
              <VForm ref="form" v-slot="{ errors }" @submit="createOrder">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <VField id="email" name="email" type="email" class="form-control"
                            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                            v-model="form.user.email" rules="email|required"></VField>
                    <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">收件人姓名</label>
                    <VField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VField>
                    <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">收件人手機</label>
                    <VField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                            placeholder="請輸入電話" v-model="form.user.tel" :rules="isPhone"></VField>
                    <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <VField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                            placeholder="請輸入地址" rules="required" v-model="form.user.address"></VField>
                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea id="message" name="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-primary py-3 px-5 text-white w-100">送出訂單</button>
                </div>
              </VForm>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script>
import { Toast } from '@/methods/toast.js'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cart'
import CartList from '@/components/CartList.vue'
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  data () {
    return {
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      couponCode: '',
      loadingItem: ''
    }
  },
  components: {
    CartList
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    // 建立訂單
    createOrder () {
      this.isLoading = true
      this.$http.post(`${VITE_API}/api/${VITE_APIPATH}/order`, { data: this.form })
        .then(res => {
          this.$refs.form.resetForm()
          this.form = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: ''
            },
            message: ''
          }
          this.getCart()
          Toast(res.data.message, 'success')
          this.$router.push(`pay/${res.data.orderId}`)
          this.isLoading = false
        })
        .catch(err => {
          Toast(err.response.data.message, 'error')
          this.isLoading = false
        })
    },
    // 套用優惠券
    addCouponCode () {
      this.loadingItem = this.couponCode
      this.$http.post(`${VITE_API}/api/${VITE_APIPATH}/coupon`, {
        data: {
          code: this.couponCode
        }
      })
        .then(res => {
          this.getCart()
          Toast(res.data.message, 'success')
          this.loadingItem = ''
        })
        .catch(err => {
          Toast(err.response.data.message, 'error')
          this.loadingItem = ''
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value)
        ? true
        : '需要正確的手機號碼'
    }
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  }
}
</script>
