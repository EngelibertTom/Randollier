<template>
  <div class="mainContainer">
    <Breadcrumb :items="[{ label: 'Accueil', to: '/' }, { label: 'Catalogue' }]" />
    <div :class="styles.header" v-reveal>
      <h1>Catalogue</h1>
      <p :class="styles.count">{{ filteredProducts.length }} produits disponibles</p>
    </div>

    <div :class="styles.toolbar" v-reveal="100">
      <div :class="styles.categories">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="[styles.catBtn, activeCategory === cat && styles.catBtnActive]"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <select :class="styles.sortSelect" v-model="sortOrder">
        <option value="">Trier par</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="name-asc">Nom A → Z</option>
        <option value="name-desc">Nom Z → A</option>
      </select>
    </div>

    <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div v-for="(product, index) in filteredProducts" :key="product.id" v-reveal="index * 60">
        <ProductCard :product="product" />
      </div>
    </div>

    <div v-else :class="styles.empty" v-reveal>
      <p>Aucun produit trouvé dans cette catégorie.</p>
      <button :class="styles.resetBtn" @click="setCategory('Tous')">Voir tous les produits</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from '@/components/productCard/ProductCard.vue'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
import type { Product } from '@/types'
import styles from './MainSection.module.css'

const products = ref<Product[]>([])
const activeCategory = ref('Tous')
const sortOrder = ref('')

const categories = ['Tous', 'Homme', 'Femme', 'Sacs', 'Équipements']

onMounted(async () => {
  const data = await fetch('/products.json')
  products.value = await data.json()
})

function setCategory(cat: string) {
  activeCategory.value = cat
}

const filteredProducts = computed(() => {
  let list = activeCategory.value === 'Tous'
    ? [...products.value]
    : products.value.filter(p => p.category === activeCategory.value)

  switch (sortOrder.value) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break
    case 'price-desc': list.sort((a, b) => b.price - a.price); break
    case 'name-asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'name-desc':  list.sort((a, b) => b.name.localeCompare(a.name)); break
  }

  return list
})
</script>
