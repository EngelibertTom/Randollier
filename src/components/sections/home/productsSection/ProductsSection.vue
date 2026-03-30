<template>
  <h2 v-reveal>Produits en vedette</h2>
  <ProductList :limit="4"/>
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue'
</script>
