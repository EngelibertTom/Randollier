<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
import Button from '@/components/ui/button/Button.vue'
import type { Product } from '@/types'
import styles from './MainSection.module.css'

const route = useRoute()
const router = useRouter()
const product = ref<Product | null>(null)
const cart = useCartStore()
const added = ref(false)

onMounted(async () => {
  const productId = Number(route.params.id)
  const allProducts: Product[] = await fetch('/products.json').then(res => res.json())
  product.value = allProducts.find(p => p.id === productId) ?? null
})

const addToCart = () => {
  if (!product.value) return
  cart.add(product.value, 1)
  added.value = true
  setTimeout(() => { added.value = false }, 2000)
}
</script>

<template>
  <div class="mainContainer">
    <Breadcrumb :items="[
      { label: 'Accueil', to: '/' },
      { label: 'Catalogue', to: '/catalogue' },
      { label: product?.name ?? '…' }
    ]" />

    <div v-if="product" :class="styles.layout">
      <div :class="styles.imageWrapper">
        <img :src="product.image" :alt="product.name" :class="styles.image" />
      </div>

      <div :class="styles.info">
        <p :class="styles.category">{{ product.category }}</p>
        <h1 :class="styles.name">{{ product.name }}</h1>
        <p :class="styles.price">{{ product.price }} €</p>
        <p :class="styles.description">{{ product.description }}</p>

        <div :class="styles.actions">
          <Button :class="[styles.cartBtn, added && styles.cartBtnAdded]" @click="addToCart">
            {{ added ? 'Ajouté au panier ✓' : 'Ajouter au panier' }}
          </Button>
          <Button :class="styles.cartLink" @click="router.push('/cart')">
            Voir le panier
          </Button>
        </div>
      </div>
    </div>

    <p v-else :class="styles.loading">Chargement…</p>
  </div>
</template>
