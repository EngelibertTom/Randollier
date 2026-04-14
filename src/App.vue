<script setup lang="ts">
import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/header/Header.vue'

const cart = useCartStore()
const auth = useAuthStore()
const route = useRoute()

onMounted(async () => {
  cart.loadFromStorage()
  await auth.fetchMe()
})
</script>

<template>
  <Header v-if="route.name !== 'Checkout' && route.name !== 'Auth'" />
  <router-view />
</template>
