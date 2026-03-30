<script setup lang="ts">
import ProductCard from './productCard/ProductCard.vue'
import { ref, onMounted, computed } from 'vue'
import type { Product } from '@/types'

const props = defineProps<{
  limit?: number
}>()

const products = ref<Product[]>([])

onMounted(async () => {
  const data = await fetch('/products.json')
  products.value = await data.json()
})

const displayedProducts = computed(() =>
  props.limit ? products.value.slice(0, props.limit) : products.value
)
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    <div v-for="(product, index) in displayedProducts" :key="product.id" v-reveal="index * 80">
      <ProductCard :product="product" />
    </div>
  </div>
</template>
