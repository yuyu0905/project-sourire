<template>
    <div>
        <swiper
            :slides-per-view="1"
            :space-between="12"
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
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }"
            :modules="modules">
            <swiper-slide>
                <div class="news-bg-1 news-bg-img bg-img">
                    <div class="d-flex flex-column justify-content-center align-items-center text-white h-100 news text-center">
                        <h3 class="fw-bold">招募會員</h3>
                        <p>新加入會員即可享有 50 元購物金</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="news-bg-2 news-bg-img bg-img">
                    <div class="d-flex flex-column justify-content-center align-items-center text-white h-100 news text-center">
                        <h4>11/6 - 11/12</h4>
                        <h3 class="fw-bold">雙 11 優惠</h3>
                        <p>全館 9 折起！</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="news-bg-3 news-bg-img bg-img">
                    <div class="d-flex flex-column justify-content-center align-items-center text-white h-100 news text-center">
                        <h3 class="fw-bold">歡慶聖誕節</h3>
                        <p>除了聖誕限定商品外，<br />
                        還有聖誕花藝課程，<br />
                        讓大家打造屬於自己的聖誕裝飾!</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="news-bg-1 news-bg-img bg-img">
                    <div class="d-flex flex-column justify-content-center align-items-center text-white h-100 news text-center">
                        <h3 class="fw-bold">招募會員</h3>
                        <p>新加入會員即可享有 50 元購物金</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="news-bg-2 news-bg-img bg-img">
                    <div class="d-flex flex-column justify-content-center align-items-center text-white h-100 news text-center">
                        <h4>11/6 - 11/12</h4>
                        <h3 class="fw-bold">雙 11 優惠</h3>
                        <p>全館 9 折起！</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="news-bg-3 news-bg-img bg-img">
                    <div class="d-flex flex-column justify-content-center align-items-center text-white h-100 news text-center">
                        <h3 class="fw-bold">歡慶聖誕節</h3>
                        <p>除了聖誕限定商品外，<br />
                        還有聖誕花藝課程，<br />
                        讓大家打造屬於自己的聖誕裝飾!</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Autoplay } from 'swiper'

export default {
  data () {
    return {
      modules: [Autoplay]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
