<template>
    <div id="loginModal" ref="loginModal" class="modal fade" tabindex="-1"
            aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header">
              <h3 id="loginModalLabel" class="modal-title">
                <span v-if="innerAction === 'login'">登入</span>
                <span v-else>註冊</span>
              </h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-end" v-if="innerAction === 'login'">沒有帳號，<a class="text-primary hover-primary" href="#" @click="() => $emit('changeAction', 'register')">快速註冊</a></p>
              <p class="text-end" v-else>已經註冊，<a class="text-primary hover-primary" href="#" @click="() => $emit('changeAction', 'login')">登入</a></p>
              <form id="form" @submit.prevent="login">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="username"
                    placeholder="name@example.com" required autofocus v-model="user.username">
                  <label for="username">信箱</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="password"
                    placeholder="Password" required v-model="user.password">
                  <label for="password">密碼</label>
                </div>
              </form>
            </div>
            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-primary py-3 px-5 text-white w-100 mb-3" @click="login">
                {{ innerAction === 'login' ? '登入' : '註冊' }}
              </button>
              <a class="text-gray-dark hover-primary text-decoration-underline d-block" href="#">忘記密碼</a>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
// const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  props: ['action'],
  data () {
    return {
      loginModal: '',
      user: {
        username: '',
        password: ''
      },
      innerAction: ''
    }
  },
  methods: {
    login () {
      // this.$http.delete(`${VITE_API}/api/${VITE_APIPATH}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
      //   .then(res => {
      //     alert(res.data.message)
      //     this.loginModal.hide()
      //     this.$emit('reloadPage')
      //   })
      //   .catch(err => {
      //     alert(err.response.data.message)
      //   })
    },

    showModal () {
      this.loginModal.show()
    }
  },
  mounted () {
    // dom 生成後，再取得 model
    this.loginModal = new Modal(this.$refs.loginModal, { keyboard: false })
  },
  watch: {
    action () {
      this.innerAction = this.action
    }
  }
}
</script>
