<template>
  <RouterView />
</template>

<style lang="scss">
@import './assets/all.scss';
</style>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  mounted () {
    AOS.init()
  }
}
</script>
