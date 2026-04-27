<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
import Button from '@/components/ui/button/Button.vue'
import styles from './MainSection.module.css'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const cart = useCartStore()
const added = ref(false)

onMounted(() => store.fetchOne(Number(route.params.id)))
onUnmounted(() => store.clearCurrent())

const addToCart = () => {
  if (!store.current) return
  cart.add(store.current, 1)
  added.value = true
  setTimeout(() => { added.value = false }, 2000)
}
</script>

<template>
  <div class="mainContainer">
    <Breadcrumb :items="[
      { label: 'Accueil', to: '/' },
      { label: 'Catalogue', to: '/catalogue' },
      { label: store.current?.name ?? '…' }
    ]" />

    <div v-if="store.current" :class="styles.layout">
      <div :class="styles.imageWrapper" v-reveal>
        <img :src="store.current.image ?? ''" :alt="store.current.name" :class="styles.image" />
      </div>

      <div :class="styles.info" v-reveal="100">
        <p :class="styles.category">{{ store.current.category.name }}</p>
        <h1 :class="styles.name">{{ store.current.name }}</h1>
        <p :class="styles.price">{{ store.current.price }} €</p>
        <p :class="styles.description">{{ store.current.description }}</p>

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

    <p v-else-if="store.loading" :class="styles.loading">Chargement…</p>
    <p v-else :class="styles.loading">{{ store.error ?? 'Produit introuvable.' }}</p>
  </div>
</template>
