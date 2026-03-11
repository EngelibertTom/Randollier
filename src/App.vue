<script setup lang="ts">
import { useCartStore } from './stores/cart';
import { onMounted } from "vue"
import Header from './components/header/Header.vue';
import HeroSection from './components/sections/heroSection/HeroSection.vue';


const cart = useCartStore()

onMounted(() => {
  cart.loadFromStorage()
})

</script>

<template>
  <Header/>
  <!-- <a href="/cart">Panier : {{cart.items.length}} élément(s)</a> -->
  <router-view />
</template>

