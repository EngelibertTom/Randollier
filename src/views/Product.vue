<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
import type { Product } from '@/types'

const route = useRoute()
const product = ref<Product | null>(null)
const cart = useCartStore()

onMounted(async () => {
  const productId = Number(route.params.id)
  const allProducts: Product[] = await fetch('/products.json').then(res => res.json())
  product.value = allProducts.find(p => p.id === productId) ?? null
})

const addToCart = () => {
  if (product.value) cart.add(product.value, 1)
}
</script>

<template>
  <div class="mainContainer">
    <Breadcrumb :items="[
      { label: 'Accueil', to: '/' },
      { label: 'Catalogue', to: '/catalogue' },
      { label: product?.name ?? '…' }
    ]" />

    <div v-if="product">
      <h1>Produit Détails</h1>
      <p>Produit ID: {{ $route.params.id }}</p>
      <button @click="addToCart">Ajouter au panier</button>
    </div>

    <p v-else>Chargement…</p>
  </div>
</template>
