<template>
  <header :class="styles.header">
    <div :class="styles.halfOne">
      <span :class="styles.logo">Randollier</span>
        <nav :class="styles.nav">
          <router-link to="/">Catalogue</router-link>
          <router-link to="/products">À propos</router-link>
          <router-link to="/about">Contact</router-link>
        </nav>
    </div>
    <div :class="styles.icons">
      <router-link to="/cart">
        <img src="@/assets/icons/cart.svg" alt="Panier"/>
            <span v-if="cart.items.length > 0">
              {{ cart.items.length }}
            </span>
      </router-link>
      <router-link to="/profile">
        <img src="@/assets/icons/profil.svg" alt="Profil"/>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/cart';
import styles from './Header.module.css'

const cart = useCartStore();


</script>