<template>
  <table class="table table-hover align-middle text-center text-gray-dark" v-if="cart.carts && cart.carts.length > 0">
    <thead>
      <tr>
        <th colspan="2">商品</th>
        <th>數量</th>
        <th>小計</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cartItem in cart.carts" :key="cartItem.id">
        <td>
            <img class="cart-img" :src="cartItem.product.imageUrl" :alt="cartItem.product.imageUrl">
        </td>
        <td>
            <p class="small mb-2 text-start">{{ cartItem.product.set }}<br />{{ cartItem.product.title }}</p>
        </td>
        <td>
            <select class="form-select" v-model.number="cartItem.qty" @change="updateCart(cartItem)"
              :disabled="cartItem.id === loadingItem">
              <option v-for="i in 20" :value="i" :key="`${i}_qty`">{{i}}</option>
            </select>
        </td>
        <td>
            {{ `NT$ ${cartItem.final_total}` }}
        </td>
        <td>
          <button type="button" class="btn hover-primary p-2 border-0" @click="delCart(cartItem.id)"
            :disabled="cartItem.id === loadingItem">
            <i class="fas fa-spinner fa-pulse" v-if="cartItem.id === loadingItem"></i>
            <i class="fa-regular fa-trash-can" v-else></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cart'
export default {
  methods: {
    ...mapActions(cartStore, ['getCart', 'delCart', 'updateCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'loadingItem'])
  },
  mounted () {
    this.getCart()
  }
}
</script>
