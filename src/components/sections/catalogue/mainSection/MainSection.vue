<template>
  <div class="mainContainer">
    <Breadcrumb :items="[{ label: 'Accueil', to: '/' }, { label: 'Catalogue' }]" />
    <div :class="styles.header" v-reveal>
      <h1>Catalogue</h1>
      <p :class="styles.count">{{ filteredProducts.length }} produits disponibles</p>
    </div>

    <div :class="styles.toolbar" v-reveal="100">
      <div :class="styles.categories">
        <Button
          v-for="cat in categories"
          :key="cat"
          :class="[styles.catBtn, activeCategory === cat && styles.catBtnActive]"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </Button>
      </div>

      <select :class="styles.sortSelect" v-model="sortOrder">
        <option value="">Trier par</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="name-asc">Nom A → Z</option>
        <option value="name-desc">Nom Z → A</option>
      </select>
    </div>

    <p v-if="store.loading" :class="styles.empty">Chargement…</p>
    <p v-else-if="store.error" :class="styles.empty">{{ store.error }}</p>

    <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div v-for="(product, index) in filteredProducts" :key="product.id" v-reveal="index * 60">
        <ProductCard :product="product" />
      </div>
    </div>

    <div v-else :class="styles.empty" v-reveal>
      <p>Aucun produit trouvé dans cette catégorie.</p>
      <Button :class="styles.resetBtn" @click="setCategory('Tous')">Voir tous les produits</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/productCard/ProductCard.vue'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
import Button from '@/components/ui/button/Button.vue'
import styles from './MainSection.module.css'

const store = useProductsStore()
const activeCategory = ref('Tous')
const sortOrder = ref('')

const categories = ['Tous', 'Homme', 'Femme', 'Sacs', 'Équipements']

onMounted(() => store.fetchAll())

function setCategory(cat: string) {
  activeCategory.value = cat
}

const filteredProducts = computed(() => {
  let list = activeCategory.value === 'Tous'
    ? [...store.products]
    : store.products.filter(p => p.category.name === activeCategory.value)

  switch (sortOrder.value) {
    case 'price-asc':  list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break
    case 'price-desc': list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break
    case 'name-asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'name-desc':  list.sort((a, b) => b.name.localeCompare(a.name)); break
  }

  return list
})
</script>
