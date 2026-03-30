<template>
  <div :class="styles.box">
    <h3 :class="styles.title">Récapitulatif</h3>

    <ul :class="styles.items">
      <li v-for="item in cart.items" :key="item.product.id" :class="styles.item">
        <img :src="item.product.image" :alt="item.product.name" :class="styles.img" />
        <div :class="styles.info">
          <span :class="styles.name">{{ item.product.name }}</span>
          <span :class="styles.qty">× {{ item.qty }}</span>
        </div>
        <span :class="styles.price">{{ fmt(item.product.price * item.qty) }}</span>
      </li>
    </ul>

    <div :class="styles.divider" />

    <div :class="styles.row">
      <span>Sous-total</span>
      <span>{{ fmt(cart.total) }}</span>
    </div>
    <div :class="styles.row">
      <span>Livraison</span>
      <span :class="styles.free">Gratuite</span>
    </div>

    <div :class="styles.divider" />

    <div :class="[styles.row, styles.total]">
      <span>Total</span>
      <span>{{ fmt(cart.total) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import styles from './CartSummary.module.css'

const cart = useCartStore()

function fmt(amount: number) {
  return amount.toFixed(2).replace('.', ',') + ' $'
}
</script>
