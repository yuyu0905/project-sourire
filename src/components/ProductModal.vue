<template>
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-gray-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="operateType === 'create'">新增產品</span>
                <span v-else>編輯產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <VForm ref="form" v-slot="{ errors }" @submit="$emit('saveProduct', innerProduct)">
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="mb-2">
                      <div class="mb-3">
                          <label for="imageUrl" class="form-label">輸入圖片網址</label>
                          <input type="text" class="form-control"
                              placeholder="請輸入圖片連結" id="imageUrl" v-model="innerProduct.imageUrl">
                      </div>
                      <div class="mb-3">
                          <label for="uploadFile" class="form-label">或 上傳圖片</label>
                          <input type="file" id="uploadFile" class="form-control" ref="fileInput" @change="uploadFile"/>
                      </div>
                      <img class="img-fluid" :src="innerProduct.imageUrl">
                    </div>
                    <h3 class="mb-3">多圖新增</h3>
                    <div class="mb-3" v-for="(imageUrl, index) in innerProduct.imagesUrl" :key="index">
                      <label for="imagesUrl" class="form-label">圖片網址</label>
                      <input type="text" class="form-control"
                              placeholder="請輸入圖片連結" id="imagesUrl" v-model="innerProduct.imagesUrl[index]">
                      <img class="img-fluid" :src="innerProduct.imagesUrl[index]">
                    </div>
                    <div v-if="!innerProduct.imagesUrl || !innerProduct.imagesUrl.length || innerProduct.imagesUrl[innerProduct.imagesUrl.length-1]">
                      <button type="button" class="btn btn-outline-primary btn-sm d-block w-100" @click="createImagesUrl">
                          新增圖片
                      </button>
                    </div>
                    <div v-else>
                      <button type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="deleteImagesUrl">
                          刪除圖片
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="mb-3">
                      <label for="set" class="form-label">系列</label>
                      <input id="set" type="text" class="form-control" placeholder="請輸入系列" v-model="innerProduct.set">
                    </div>
                    <div class="mb-3">
                      <label for="title" class="form-label">標題</label>
                      <VField id="title" name="標題" type="text" class="form-control" :class="{ 'is-invalid': errors['標題'] }"
                        placeholder="請輸入標題" rules="required" v-model="innerProduct.title"></VField>
                      <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="mb-3">
                      <label for="subTitle" class="form-label">副標題</label>
                      <input id="subTitle" type="text" class="form-control" placeholder="請輸入副標題" v-model="innerProduct.subTitle">
                    </div>
                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label for="category" class="form-label">分類</label>
                        <VField id="category" name="分類" type="text" class="form-control" :class="{ 'is-invalid': errors['分類'] }"
                          placeholder="請輸入分類" rules="required" v-model="innerProduct.category"></VField>
                        <ErrorMessage name="分類" class="invalid-feedback"></ErrorMessage>
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">單位</label>
                        <VField id="unit" name="單位" type="text" class="form-control" :class="{ 'is-invalid': errors['單位'] }"
                          placeholder="請輸入單位" rules="required" v-model="innerProduct.unit"></VField>
                        <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                      </div>
                    </div>
                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label for="origin_price" class="form-label">原價</label>
                        <VField id="origin_price" name="原價" type="number" class="form-control" :class="{ 'is-invalid': errors['原價'] }"
                          placeholder="請輸入原價" min="0" rules="required|min_value:0|numeric|integer" v-model.number="innerProduct.origin_price"></VField>
                        <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">售價</label>
                        <VField id="price" name="售價" type="number" class="form-control" :class="{ 'is-invalid': errors['售價'] }"
                          placeholder="請輸入售價" min="0" rules="required|min_value:0|numeric|integer" v-model.number="innerProduct.price"></VField>
                        <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                      </div>
                    </div>
                    <hr>
                    <div class="mb-3">
                      <label for="description" class="form-label">產品描述</label>
                      <textarea id="description" type="text" class="form-control"
                              placeholder="請輸入產品描述" v-model="innerProduct.description">
                      </textarea>
                    </div>
                    <div class="mb-3">
                      <label for="content" class="form-label">說明內容</label>
                      <textarea id="content" type="text" class="form-control"
                              placeholder="請輸入說明內容" v-model="innerProduct.content">
                      </textarea>
                    </div>
                    <div class="mb-3">
                      <div class="form-check">
                        <input id="is_enabled" class="form-check-input" type="checkbox"
                              :true-value="1" :false-value="0" v-model="innerProduct.is_enabled">
                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-check">
                        <input id="is_limited_time" class="form-check-input" type="checkbox"
                              :true-value="1" :false-value="0" v-model="innerProduct.is_limited_time">
                        <label class="form-check-label" for="is_limited_time">是否為期間限定</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  取消
                </button>
                <button type="submit" class="btn btn-gray-dark">
                  確認
                </button>
              </div>
            </VForm>
          </div>
        </div>
      </div>
</template>

<script>
import Swal from 'sweetalert2'
import Modal from 'bootstrap/js/dist/modal'
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  props: ['tempProduct', 'operateType'],
  emits: ['saveProduct'],
  data () {
    return {
      productModal: ''
    }
  },
  methods: {
    // 新增圖片
    createImagesUrl () {
      if (!this.innerProduct.imagesUrl) {
        this.innerProduct.imagesUrl = []
      }
      this.innerProduct.imagesUrl.push('')
    },
    // 刪除圖片
    deleteImagesUrl () {
      this.innerProduct.imagesUrl.pop()
    },
    showModal () {
      this.productModal.show()
    },
    hideModal () {
      this.productModal.hide()
    },
    // 上傳圖片
    uploadFile () {
      const formData = new FormData()
      formData.append('file-to-upload', this.$refs.fileInput.files[0])
      const url = `${VITE_API}/api/${VITE_APIPATH}/admin/upload`

      Swal.fire({
        title: '上傳圖片中',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          this.$http.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(res => {
              if (res.data.success) {
                this.innerProduct.imageUrl = res.data.imageUrl
              }
              this.$refs.fileInput.value = ''
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: err.response.data.message
              })
              this.$refs.fileInput.value = ''
            })
        }
      })
    }
  },
  mounted () {
    // dom 生成後，再取得 model
    this.productModal = new Modal(this.$refs.productModal, { keyboard: false })
  },
  computed: {
    innerProduct () {
      return this.tempProduct
    }
  }
}
</script>
