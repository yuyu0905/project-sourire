<template>
    <VueLoading :active="isLoading">
        <img class="img-fluid loading-img animate__animated animate__shakeY" src="@/assets/images/logo-lg.svg" alt="logo">
    </VueLoading>
    <main>
      <section class="bg-background py-5">
        <div class="container">
            <h2 class="fw-bold text-center mb-4 mb-lg-5">購買花禮</h2>
            <div class="row gy-4">
                <div class="col-12 col-md-3">
                    <div class="list-group">
                        <a href="#" :class="`list-group-item list-group-item-action btn btn-basic py-2 ${category === '' ? 'active' : ''}`"
                            @click.prevent="filterProducts('')">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1"><i class="fa-solid fa-seedling icon text-gray-dark" v-if="category === ''"></i>全部商品</h5>
                            </div>
                        </a>
                        <a href="#" :class="`list-group-item list-group-item-action btn btn-basic py-2 ${category === '花束' ? 'active' : ''}`"
                            @click.prevent="filterProducts('花束')">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1"><i class="fa-solid fa-seedling icon text-gray-dark" v-if="category === '花束'"></i>經典花束</h5>
                            </div>
                        </a>
                        <a href="#" :class="`list-group-item list-group-item-action btn btn-basic py-2 ${category === '盆花' ? 'active' : ''}`"
                            @click.prevent="filterProducts('盆花')">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1"><i class="fa-solid fa-seedling icon text-gray-dark" v-if="category === '盆花'"></i>乾燥盆花</h5>
                            </div>
                        </a>
                        <a href="#" :class="`list-group-item list-group-item-action btn btn-basic py-2 ${category === '捧花' ? 'active' : ''}`"
                            @click.prevent="filterProducts('捧花')">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1"><i class="fa-solid fa-seedling icon text-gray-dark" v-if="category === '捧花'"></i>新娘捧花</h5>
                            </div>
                        </a>
                        <a href="#" :class="`list-group-item list-group-item-action btn btn-basic py-2 ${category === '花圈' ? 'active' : ''}`"
                            @click.prevent="filterProducts('花圈')">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1"><i class="fa-solid fa-seedling icon text-gray-dark" v-if="category === '花圈'"></i>花圈</h5>
                            </div>
                        </a>
                        <a href="#" :class="`list-group-item list-group-item-action btn btn-basic py-2 ${category === '材料' ? 'active' : ''}`"
                            @click.prevent="filterProducts('材料')">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1"><i class="fa-solid fa-seedling icon text-gray-dark" v-if="category === '材料'"></i>手作材料包</h5>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-12 col-md-9">
                    <div class="row gy-4 mb-4">
                        <div class="col-12 col-md-6 col-lg-4" v-for="product in products" :key="product.id">
                            <div class="card products-card-hover">
                                    <RouterLink :to="`/product/${product.id}`">
                                        <div class="img-fluid card-img-top bg-img products-img position-relative" :style="`background-image: url(${product.imageUrl});`">
                                            <p class="fs-6 py-2 px-7 mb-0 bg-white position-absolute w-100 text-center bottom-0 products-more">詳細資訊</p>
                                        </div>
                                    </RouterLink>
                                    <div class="card-body p-3 p-lg-4">
                                        <h3 class="card-title fs-4 fw-bold mb-3 text-gray-dark">{{ product.set }}<br />{{ product.title }}</h3>
                                        <div class="d-flex gap-2 mb-4">
                                            <p class="mb-0" v-if="product.is_limited_time"><span class="badge bg-light text-gray-dark fw-normal fs-6">期間限定</span></p>
                                            <p class="mb-0" v-else-if="product.category === '花束'"><span class="badge bg-light text-gray-dark fw-normal fs-6">送禮首選</span></p>
                                            <p class="mb-0"><span class="badge bg-light text-gray-dark fw-normal fs-6">{{ product.category }}</span></p>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p class="card-text text-primary-dark fw-bold fs-5 mb-0" v-if="product.price === product.origin_price">{{ `NT$ ${product.origin_price}` }}</p>
                                            <p v-else class="card-text text-primary-dark fw-bold fs-5 mb-0">
                                                <del class="text-gray-dark fw-normal small me-2">{{ `NT$ ${product.origin_price}` }}</del>{{ `NT$ ${product.price}` }}
                                            </p>
                                            <button type="button" class="btn btn-outline-gray-dark border-gray-dark fw-bold py-2"
                                                @click.prevent="addCart(product.id)"
                                                :disabled="product.id === loadingItem">
                                                <i class="fas fa-spinner fa-pulse" v-if="product.id === loadingItem"></i>
                                                <i class="fa-solid fa-cart-plus" v-else></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- 分頁元件 -->
                    <PaginationComponent :pagination="pagination" @change-page="getProducts" />
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
import PaginationComponent from '@/components/PaginationComponent.vue'
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      product: {},
      isLoading: false,
      pagination: {},
      pageNum: 1,
      category: ''
    }
  },
  methods: {
    // 產品列表
    getProducts (pageNum = 1) { // 參數預設值
      this.isLoading = true
      this.pageNum = pageNum
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/products?page=${pageNum}&category=${this.category}`)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch(err => {
          Toast(err.response.data.message, 'error')
          this.isLoading = false
        })
    },
    // 切換類別
    filterProducts (category) {
      if (this.category !== category) {
        this.category = category
        this.getProducts()
      }
    },
    // 加入購物車
    ...mapActions(cartStore, ['addCart'])
  },
  components: {
    PaginationComponent
  },
  mounted () {
    this.getProducts()
  },
  computed: {
    ...mapState(cartStore, ['loadingItem'])
  }
}
</script>
