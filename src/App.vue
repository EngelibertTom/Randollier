<script setup lang="ts">
import { useCartStore } from './stores/cart';
import { onMounted } from "vue"
import Header from './components/header/Header.vue';


const cart = useCartStore()

onMounted(() => {
  cart.loadFromStorage()
})

</script>

<template>
  <Header/>
  <router-view />
</template>

