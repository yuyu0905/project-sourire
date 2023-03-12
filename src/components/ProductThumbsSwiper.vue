<template>
  <div class="col-12 col-md-6 col-lg-5">
    <swiper
        :loop="true"
        :spaceBetween="10"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="swiper product-img-swiper mySwiper2">
        <swiper-slide v-for="img in imagesUrl" :key="img">
            <img class="img-fluid" :src="img" :alt="img">
        </swiper-slide>
    </swiper>
    <swiper
        @swiper="setThumbsSwiper"
        :loop="true"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :modules="modules"
        class="swiper product-imgs-swiper mySwiper">
        <swiper-slide v-for="img in imagesUrl" :key="img">
          <img class="img-fluid" :src="img" :alt="img">
        </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper'

export default {
  props: ['imageUrl', 'imagesUrl'],
  data () {
    return {
      thumbsSwiper: null,
      modules: [FreeMode, Navigation, Thumbs]
    }
  },
  methods: {
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
