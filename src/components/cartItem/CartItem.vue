<template>
  <div :class="styles.item">
    <img
      v-if="product.image"
      :src="product.image"
      :alt="product.name"
      :class="styles.itemImage"
    />
    <div v-else :class="styles.itemImage" />

    <div :class="styles.itemDetails">
      <span :class="styles.itemPrice">{{ formatPrice(product.price) }}</span>
      <div :class="styles.itemNameRow">
        <span :class="styles.itemName">{{ product.name }}</span>
        <Button :class="styles.removeBtn" @click="removeAll">×</Button>
      </div>
      <div :class="styles.quantityControl">
        <Button :class="styles.qtyBtn" @click="decrement">−</Button>
        <span :class="styles.qtyValue">{{ quantity }}</span>
        <Button :class="styles.qtyBtn" @click="increment">+</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './CartItem.module.css'
import { useCartStore } from '@/stores/cart'
import Button from '@/components/ui/button/Button.vue'
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