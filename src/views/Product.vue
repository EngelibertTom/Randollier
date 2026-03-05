<script setup lang="ts">
import {useRoute} from "vue-router";
import { ref , onMounted } from 'vue';

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const productId = Number(route.params.id);
  const allProducts = await fetch('/products.json').then(res => res.json());
  product.value = allProducts.find(p => p.id === productId);

  console.log(product.value);
})

</script>

<template>

  <div v-if="product">
    <h1>Produit Détails</h1>
    <p>Produit ID: {{ $route.params.id }}</p>
  </div>

  <p v-else>Chargement.... </p>

</template>

