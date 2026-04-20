<template>
  <div :class="styles.card">

    <RouterLink :to="`/product/${product.id}`" :class="styles.imageLink">
      <img
        :src="product.image"
        :alt="product.name"
        :class="styles.image"
      />
    </RouterLink>

    <div :class="styles.header">
      <RouterLink :to="`/product/${product.id}`" :class="styles.titleLink">
        <h3 :class="styles.title">
          {{ product.name }}
        </h3>
      </RouterLink>

      <Button :class="styles.addToCart" @click="addToCart">
        <img src="@/assets/icons/addCard.svg" alt="icon ajout au panier"/>
      </Button>
    </div>

    <p :class="styles.price">
      {{ product.price }} €
    </p>

  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import styles from './ProductCard.module.css'
import Button from '@/components/ui/button/Button.vue'
import type { Product } from '../../types';

const props = defineProps<{
  product: Product
}>()

const cart = useCartStore();

const addToCart = () => {
  cart.add(props.product, 1)
}
</script>