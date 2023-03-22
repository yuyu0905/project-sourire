<template>
  <main>
    <!-- banner -->
    <section class="banner bg-background">
      <div class="container-lg">
        <div class="row mb-4 d-lg-flex flex-lg-row-reverse">
          <div class="col-12 col-lg-8 row g-0 g-lg-1">
            <img class="img-fluid banner-img col-6" src="@/assets/images/banner_1.jpg" alt="banner_1"
              data-aos="fade-right" data-aos-delay="150">
            <img class="img-fluid banner-img col-6" src="@/assets/images/banner_2.jpg" alt="banner_2"
              data-aos="fade-left" data-aos-delay="150">
          </div>
          <div class="col-12 col-lg-4 d-lg-flex flex-lg-column justify-content-lg-center">
            <h1 class="fw-bold my-4" data-aos="fade-up" data-aos-delay="50">一束花的浪漫<br />
              帶來微笑<br />
              展開美好的一天</h1>
            <form class="row g-0 my-3">
              <!-- TODO -->
              <!-- <div class="col-10">
                <i class="fa-solid fa-magnifying-glass d-flex align-items-center bg-white ps-3">
                  <input class="form-control py-3 border-0" type="search" placeholder="今天想買什麼花？" aria-label="Search">
                </i>
              </div>
              <RouterLink class="btn btn-primary py-3 text-white col-2 small" to="/products">
                搜尋
              </RouterLink>
               -->
              <RouterLink class="btn btn-primary py-3 text-white col-5 small" to="/products">
                購買去<i class="fa-solid fa-arrow-right text-white icon"></i>
              </RouterLink>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- 介紹 -->
    <section class="bg-white py-5">
      <div class="container">
        <div class="row gap-3 gap-lg-0">
          <div class="col-12 col-lg-6 d-flex flex-column justify-content-between">
            <div class="card bg-light" data-aos="fade-up">
              <div class="card-body p-4 m-2">
                <h3 class="card-title fw-bold mb-3">讓乾燥花走進生活</h3>
                <p class="card-text">乾燥花顧名思義是「乾燥」的植物，不需脫水脫色，是鮮花自然風乾後的「真花」。</p>
                <p class="card-text">質地比較硬且脆弱，一般來說乾燥花可以保存一年～兩年以上。</p>
              </div>
            </div>
            <img class="img-fluid info-img-1" src="@/assets/images/info_1.jpg" alt="info_1" data-aos="fade-up">
          </div>
          <div class="col-12 col-lg-6 d-flex flex-column gap-3 gap-lg-4">
            <img class="img-fluid info-img-2" src="@/assets/images/info_2.jpg" alt="info_2"
              data-aos="fade-up" data-aos-delay="300">
            <div class="card bg-gray-dark" data-aos="fade-up">
              <div class="card-body p-3">
                <p class="card-text text-white">Sourire 在法語是微笑的意思<br />
                  希望能藉由我們的花束，讓您綻放微笑。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 服務 -->
    <section class="bg-background py-5">
      <div class="container">
        <h2 class="fw-bold text-center mb-4 mb-lg-5">Sourire 能帶給你的</h2>
        <div class="row gy-4">
          <div class="col-12 col-lg-4">
            <div class="card" data-aos="flip-left" data-aos-delay="300">
              <img class="img-fluid card-img-top service-img" src="@/assets/images/service_1.jpg" alt="service_1">
              <div class="card-body bg-background px-0">
                <h3 class="card-title fw-bold">經典花禮</h3>
                <p class="card-text">在特別的日子<br />獻上祝福</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card" data-aos="flip-left" data-aos-delay="600">
              <img class="img-fluid card-img-top service-img" src="@/assets/images/service_2.jpg" alt="service_2">
              <div class="card-body bg-background px-0">
                <h3 class="card-title fw-bold">手作課程</h3>
                <p class="card-text">小班制教學<br />感受乾燥花的魅力</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card" data-aos="flip-left" data-aos-delay="900">
              <img class="img-fluid card-img-top service-img" src="@/assets/images/service_3.jpg" alt="service_3">
              <div class="card-body bg-background px-0">
                <h3 class="card-title fw-bold">客製花禮</h3>
                <p class="card-text">讓您能擁有<br />獨一無二的設計</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 活動資訊 -->
    <section class="bg-background py-5">
      <div class="container">
        <h2 class="fw-bold text-center mb-4 mb-lg-5">活動資訊</h2>
        <NewsSwiper />
      </div>
    </section>
    <!-- 精選花束 -->
    <section class="bg-background py-5">
      <div class="container">
        <h2 class="fw-bold text-center mb-4 mb-lg-5">精選花束</h2>
        <RecommendSwiper />
      </div>
    </section>
    <!-- 聯絡我們 -->
    <section class="bg-white py-5">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.002889711431!2d121.56453889999999!3d25.033976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c9e1f%3A0x1206bcf082fd10a6!2zMTEw5Y-w5YyX5biC5L-h576p5Y2A5L-h576p6Lev5LqU5q61N-iZnw!5e0!3m2!1szh-TW!2stw!4v1674927233106!5m2!1szh-TW!2stw"
            width="100%" height="206" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="contact-map col-12 col-lg-5"></iframe>
          <div class="card col-12 col-lg-3">
            <div class="card-body">
              <h2 class="card-title fw-bold mb-4">聯絡我們</h2>
              <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
                <li>
                    <a class="text-gray-dark hover-primary" href="https://goo.gl/maps/U7RGvmZsUH4432z87" target="_blank">
                        <i class="fa-solid fa-location-dot icon me-2"></i>110 台北市信義區信義路五段7號
                    </a>
                </li>
                <li>
                    <a class="text-gray-dark hover-primary" href="tel:+886912-345-345">
                        <i class="fa-solid fa-phone icon me-2"></i>0912-345-345
                    </a>
                </li>
                <li>
                    <a class="text-gray-dark hover-primary" href="mailto:sourire-flower@gmail.com">
                        <i class="fa-regular fa-envelope icon me-2"></i>sourire-flower@gmail.com
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import NewsSwiper from '@/components/NewsSwiper.vue'
import RecommendSwiper from '@/components/RecommendSwiper.vue'

export default {
  components: {
    NewsSwiper,
    RecommendSwiper
  }
}
</script>
