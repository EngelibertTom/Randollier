<template>
  <div :class="styles.item">
    <div :class="styles.itemImage" />

    <div :class="styles.itemDetails">
      <span :class="styles.itemPrice">{{ formatPrice(product.price) }}</span>
      <div :class="styles.itemNameRow">
        <span :class="styles.itemName">{{ product.name }}</span>
        <button :class="styles.removeBtn" @click="removeAll">×</button>
      </div>
      <div :class="styles.quantityControl">
        <button :class="styles.qtyBtn" @click="decrement">−</button>
        <span :class="styles.qtyValue">{{ quantity }}</span>
        <button :class="styles.qtyBtn" @click="increment">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './CartItem.module.css'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
  quantity: number
}>()

const cart = useCartStore()

function increment() {
  cart.add(props.product, 1)
}

function decrement() {
  cart.remove(props.product, 1)
}

function removeAll() {
  cart.remove(props.product, props.quantity)
}

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' $'
}
</script>