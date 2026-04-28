<template>
  <div v-if="store.featured.length">
    <h2 v-reveal>Produits en vedette</h2>
    <ProductList :products="store.featured" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductList from '@/components/ProductList.vue'

const store = useProductsStore()

onMounted(() => store.fetchFeatured())
</script>
