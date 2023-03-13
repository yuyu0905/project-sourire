<template>
  <VueLoading :active="isLoading">
      <img class="img-fluid loading-img animate__animated animate__shakeY" src="@/assets/images/logo-lg.svg" alt="logo">
  </VueLoading>
  <main>
    <section class="bg-background py-5">
        <div class="container product">
            <div class="row">
                <ProductThumbsSwiper :imagesUrl="allImagesUrl"></ProductThumbsSwiper>
                <div class="col-12 col-md-6 col-lg-7">
                  <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <RouterLink class="text-gray-dark p-1 p-lg-2 hover-primary" to="/">
                              首頁
                            </RouterLink>
                          </li>
                          <li class="breadcrumb-item">
                            <RouterLink class="text-gray-dark p-1 p-lg-2 hover-primary" to="/products">
                              購買花禮
                            </RouterLink>
                          </li>
                          <li class="breadcrumb-item"><span class="text-dark">{{ product.set + product.title }}</span></li>
                      </ol>
                  </nav>
                  <h2 class="fw-bold">{{ product.set + product.title }}</h2>
                  <h3 class="mb-5">{{ product.subTitle }}</h3>
                  <p class="mb-5" v-html="product.description"></p>
                  <p class="fs-3 mb-3" v-if="product.price === product.origin_price">{{ `NT$ ${product.origin_price}` }}</p>
                    <p v-else class="fs-3 mb-3">
                        <del class="text-gray-dark fw-normal fs-4 me-2">{{ `NT$ ${product.origin_price}` }}</del>{{ `NT$ ${product.price}` }}
                    </p>
                  <div class="input-group">
                    <select class="form-select" v-model.number="qty">
                      <option v-for="i in 20" :value="i" :key="`${i}_qty`">{{i}}</option>
                    </select>
                    <button type="button" class="btn btn-primary py-3 px-5 text-white link-width"
                        @click.prevent="addCart(product.id, qty)"
                        :disabled="product.id === loadingItem">
                        加入購物車
                    </button>
                  </div>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white py-5">
        <div class="container">
            <h2 class="mb-3">購買須知</h2>
            <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
                <li>
                    <p class="mb-0">※本商品由天然花材手工製作而成，因此外觀可能會稍有不同。</p>
                </li>
                <li>
                    <p class="mb-0">※因為天然花材、拍攝或螢幕解析等原因，商品的色差可能會有所不同，請以實物為準。</p>
                </li>
                <li>
                    <p class="mb-0">※尺寸可能會因為製作或測量手法的不同而有1~2公分的誤差，屬於正常範圍。</p>
                </li>
                <li>
                    <p class="mb-0">※若因為季節性或其他不可抗力因素導致花材短缺，我們會更換等價的花材，不會另行通知。</p>
                </li>
            </ul>
        </div>
    </section>
    <!-- 精選花束 -->
    <section class="bg-background py-5">
        <div class="container">
          <h2 class="fw-bold text-center mb-4 mb-lg-5">精選花束</h2>
          <RecommendSwiper></RecommendSwiper>
        </div>
    </section>
  </main>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cart'
import ProductThumbsSwiper from '@/components/ProductThumbsSwiper.vue'
import RecommendSwiper from '@/components/RecommendSwiper.vue'
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  data () {
    return {
      product: {},
      qty: 1,
      isLoading: false,
      allImagesUrl: []
    }
  },
  methods: {
    ...mapActions(cartStore, ['addCart']),
    // 單一產品細節
    getProduct () {
      this.isLoading = true
      const { id } = this.$route.params
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
          this.isLoading = false
          this.allImagesUrl = res.data.product.imagesUrl?.length > 0 ? [res.data.product.imageUrl, res.data.product.imagesUrl] : [res.data.product.imageUrl]
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
  components: {
    ProductThumbsSwiper,
    RecommendSwiper
  },
  mounted () {
    this.getProduct()
  },
  computed: {
    ...mapState(cartStore, ['loadingItem'])
  }
}
</script>
