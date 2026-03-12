<script setup lang="ts">
import ProductCard from './productCard/ProductCard.vue';
import { ref, onMounted } from 'vue';

const products = ref([])

onMounted(async () => {
  const data = await fetch('/products.json');
  products.value = await data.json();
})

</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <ProductCard
        v-for="product in products"
        :key ="product.id" :product="product"
    />
  </div>
</template>

