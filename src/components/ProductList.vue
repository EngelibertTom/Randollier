<script setup lang="ts">
import ProductCard from './productCard/ProductCard.vue'
import type { Product } from '@/types'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-[32px]">
    <div v-for="(product, index) in products" :key="product.id" v-reveal="index * 80">
      <ProductCard :product="product" />
    </div>
  </div>
</template>
