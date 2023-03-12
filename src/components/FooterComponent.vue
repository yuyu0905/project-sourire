<template>
    <footer>
        <section class="bg-background pt-5">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mt-4">
                    <img class="img-fluid" src="@/assets/images/logo-lg.svg" alt="logo">
                    <div class="d-flex align-items-center gap-1">
                        <p class="d-none d-lg-block mb-0 me-3">更多關於 Sourire 乾燥花坊</p>
                        <a class="btn hover-primary hover-transform-scale hover-transition px-1" href="#" role="button">
                            <img class="img-fluid icon" src="@/assets/images/ic_facebook.svg" alt="facebook">
                        </a>
                        <a class="btn hover-primary hover-transform-scale hover-transition px-1" href="#" role="button">
                            <img class="img-fluid icon" src="@/assets/images/ic_line.svg" alt="line">
                        </a>
                        <a class="btn hover-primary hover-transform-scale hover-transition px-1" href="#" role="button">
                            <img class="img-fluid icon" src="@/assets/images/ic_instagram.svg" alt="instagram">
                        </a>
                    </div>
                </div>
                <hr class="mb-lg-4" />
            </div>
        </section>
        <section class="bg-primary py-3">
            <p class="text-center text-white small mb-0">Copyright © 2023 六角專題 Sourire 乾燥花坊
                <br class="d-block d-lg-none" />
                All Rights Reserved.</p>
        </section>

        <!-- 按鈕 -->
        <section class="position-fixed bottom-10 end-5 z-index-1 top-btn">
            <div class="d-flex flex-column gap-3">
                <!-- <a class="btn hover-transform-scale bg-white rounded-pill position-relative" href="#" role="button">
                    <img class="img-fluid icon-lg" src="@/assets/images/ic_message.svg" alt="message">
                    <span class="badge rounded-pill bg-dark position-absolute top-0 start-75 pill-number fw-medium">1</span>
                </a> -->
                <a class="btn hover-transform-scale bg-white rounded-pill px-2 py-3 d-flex flex-column align-items-center"
                    role="button" v-if="scrollTop > 500" @click="scrollToTop">
                    <img class="img-fluid mb-0 mb-lg-3 " src="@/assets/images/top.svg" alt="top" width="12" height="42">
                    <span class="text-vertical-lr d-none d-lg-inline">回 到 上 面</span>
                </a>
            </div>
        </section>
    </footer>
</template>
<script>
export default {
  data () {
    return {
      scrollTop: 0
    }
  },
  methods: {
    scrollToTop () {
      this.scrollTop = 0
      window.scrollTo(0, 0)
    },
    handleScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
