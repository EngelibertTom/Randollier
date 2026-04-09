<script setup lang="ts">
import { useCartStore } from './stores/cart'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/header/Header.vue'

const cart = useCartStore()
const route = useRoute()

onMounted(() => {
  cart.loadFromStorage()
})
</script>

<template>
  <Header v-if="route.name !== 'Checkout' && route.name !== 'Auth'" />
  <router-view />
</template>
