<script setup lang="ts">
import { useCartStore } from './stores/cart';
import { onMounted } from "vue"


const cart = useCartStore()

onMounted(() => {
  cart.loadFromStorage()
})

</script>

<template>
  <a href="/cart">Panier : {{cart.items.length}} élément(s)</a>
  <router-view />
</template>

