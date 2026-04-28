<template>
  <header :class="styles.header">
    <span :class="styles.logo"><router-link to="/">Randollier</router-link></span>

    <nav :class="[styles.nav, menuOpen && styles.navOpen]">
      <router-link to="/catalogue" @click="menuOpen = false">Catalogue</router-link>
      <router-link to="/products" @click="menuOpen = false">À propos</router-link>
      <router-link to="/about" @click="menuOpen = false">Contact</router-link>
    </nav>

    <div :class="styles.icons">
      <router-link to="/cart" :class="styles.cartLink">
        <CartIcon :class="styles.icon" aria-label="Panier"/>
        <span v-if="cart.items.length > 0" :class="styles.badge">
          {{ cart.items.length }}
        </span>
      </router-link>
      <router-link :to="auth.isLoggedIn ? '/profile' : '/auth'">
        <ProfilIcon :class="styles.icon" aria-label="Profil"/>
      </router-link>
      <Button :class="styles.hamburger" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useAuthStore } from '../../stores/auth'
import Button from '@/components/ui/button/Button.vue'
import CartIcon from '@/assets/icons/cart.svg?component'
import ProfilIcon from '@/assets/icons/profil.svg?component'
import styles from './Header.module.css'

const cart = useCartStore()
const auth = useAuthStore()
const menuOpen = ref(false)
</script>
