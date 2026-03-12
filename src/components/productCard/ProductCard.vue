<template>
  <div :class="styles.card">

    <img 
      :src="product.image" 
      :alt="product.name" 
      :class="styles.image"
    />

    <div :class="styles.header">
      <h3 :class="styles.title">
        {{ product.name }}
      </h3>

      <button :class="styles.addToCart" @click="addToCart">
        <img src="@/assets/icons/addCard.svg" alt="icon ajout au panier"/>
      </button>
    </div>

    <p :class="styles.price">
      {{ product.price }} € 
    </p>

  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import styles from './ProductCard.module.css'
import type { Product } from '../../types';

const props = defineProps<{
  product: Product
}>()


const cart = useCartStore();

const addToCart = () => {
  cart.add(props.product, 1)
}
</script>