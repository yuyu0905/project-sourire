<template>
    <VueLoading :active="isLoading">
        <img class="img-fluid loading-img animate__animated animate__shakeY" src="@/assets/images/logo-lg.svg" alt="logo">
    </VueLoading>
    <div class="recommend-swiper mb-4 mb-lg-5">
        <swiper
            :breakpoints="{
                '768': {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                '992': {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            }"
            :pagination="{
                el: '.share-swiper-pagination',
                clickable: true
            }"
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }"
            :modules="modules">
            <!-- If we need navigation buttons -->
            <i class="fa-solid fa-angle-left icon-lg swiper-button-prev text-gray-dark bg-white rounded-pill hover-transform-scale"></i>
            <swiper-slide v-for="product in products" :key="product.id">
                <RouterLink :to="`/product/${product.id}`">
                    <div class="card">
                        <img class="img-fluid card-img-top recommend-img" :src="product.imageUrl" :alt="product.imageUrl">
                        <div class="card-body p-3 p-lg-4">
                        <h3 class="card-title fw-bold mb-3 text-gray-dark">{{ product.set }}<br />{{ product.title }}</h3>
                        <div class="d-flex gap-2 mb-4">
                            <p class="mb-0" v-if="product.is_limited_time"><span class="badge bg-light text-primary fw-normal fs-6">期間限定</span></p>
                            <p class="mb-0" v-else-if="product.category === '花束'"><span class="badge bg-light text-primary fw-normal fs-6">送禮首選</span></p>
                            <p class="mb-0"><span class="badge bg-light text-primary fw-normal fs-6">{{ product.category }}</span></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="card-text fs-4 text-primary fw-bold mb-0" v-if="product.price === product.origin_price">{{ `NT$ ${product.origin_price}` }}</p>
                            <p v-else class="card-text fs-4 text-primary fw-bold mb-0">
                                <del class="text-gray-dark fw-normal fs-6 me-2">{{ `NT$ ${product.origin_price}` }}</del>{{ `NT$ ${product.price}` }}
                            </p>
                            <RouterLink href="#" class="btn btn-basic fw-bold py-2" :to="`/product/${product.id}`">立即購買
                                <i class="fa-solid fa-arrow-right icon"></i>
                            </RouterLink>
                        </div>
                        </div>
                    </div>
                </RouterLink>
            </swiper-slide>
            <!-- If we need navigation buttons -->
            <i class="fa-solid fa-angle-right icon-lg swiper-button-next text-gray-dark bg-white rounded-pill hover-transform-scale"></i>

            <div class="d-flex align-items-center justify-content-center swiper-buttons mt-4">
                <!-- If we need pagination -->
                <div class="swiper-pagination share-swiper-pagination d-flex w-auto mx-2"></div>
            </div>
        </swiper>
    </div>
    <div class="d-flex justify-content-center">
        <RouterLink class="btn btn-primary py-3 px-5 text-white link-width" to="/products">
        查看更多
        </RouterLink>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper'
const { VITE_API, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      modules: [Autoplay, Pagination, Navigation],
      products: [],
      product: {},
      loadingItem: '', // 存 ID
      isLoading: false
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    // 產品列表
    getProducts () {
      this.isLoading = true
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/products`)
        .then(res => {
          this.products = res.data.products
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
    this.getProducts()
  }
}
</script>
