import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCheckoutStore = defineStore('checkout', () => {
  const buyNowItem = ref<any>(null)
  const cartItems = ref<any[]>([])
  const checkoutMode = ref<'cart' | 'buy-now'>('cart')

  const setBuyNowItem = (item: any) => {
    buyNowItem.value = item
    cartItems.value = []
    checkoutMode.value = 'buy-now'
  }

  const setCartItems = (items: any[]) => {
    cartItems.value = [...items]
    checkoutMode.value = 'cart'
  }

  const clearCheckout = () => {
    buyNowItem.value = null
    cartItems.value = []
    checkoutMode.value = 'cart'
  }

  return { buyNowItem, cartItems, checkoutMode, setBuyNowItem, setCartItems, clearCheckout }
})
