<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4">Test Checkout Data</h2>

    <div class="mb-4">
      <label>First Name:</label>
      <input v-model="form.firstName" class="border px-2 py-1" />
    </div>
    <div class="mb-4">
      <label>Last Name:</label>
      <input v-model="form.lastName" class="border px-2 py-1" />
    </div>
    <div class="mb-4">
      <label>Email:</label>
      <input v-model="form.email" class="border px-2 py-1" />
    </div>
    <div class="mb-4">
      <label>Phone:</label>
      <input v-model="form.phone" class="border px-2 py-1" />
    </div>

    <div class="mb-4">
      <label>Product ID:</label>
      <input type="number" v-model="buyNowItem.product_id" class="border px-2 py-1" />
    </div>
    <div class="mb-4">
      <label>Quantity:</label>
      <input type="number" v-model="buyNowItem.quantity" class="border px-2 py-1" />
    </div>
    <div class="mb-4">
      <label>Price:</label>
      <input type="number" v-model="buyNowItem.price" class="border px-2 py-1" />
    </div>

    <div class="mb-4">
      <label>Shipping:</label>
      <select v-model="selectedShipping">
        <option>Tiêu chuẩn</option>
        <option>Nhanh</option>
      </select>
    </div>

    <button @click="showData" class="bg-blue-500 text-white px-4 py-2 rounded">Show Data</button>

    <pre class="mt-4 bg-gray-100 p-4 rounded">
{{ debugData }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const buyNowItem = reactive({
  product_id: 0,
  quantity: 1,
  price: 0
})

const selectedShipping = ref('Tiêu chuẩn')
const debugData = ref({})

function showData() {
  const shippingCost = selectedShipping.value === 'Nhanh' ? 30000 : 0
  const amount = Math.round(buyNowItem.price * buyNowItem.quantity + shippingCost)
  const orderInfo = `Thanh toan don hang #${buyNowItem.product_id}`
  const orderType = 'topup'
  const shipping_address = `Địa chỉ mẫu, ${selectedShipping.value}`

  debugData.value = {
    amount,
    orderInfo,
    orderType,
    shipping_address,
    customer: {
      name: `${form.firstName} ${form.lastName}`,
      phone: form.phone,
      email: form.email
    }
  }

  console.log('Debug data:', debugData.value)
}
</script>

<style scoped>
input, select {
  width: 100%;
}
</style>
