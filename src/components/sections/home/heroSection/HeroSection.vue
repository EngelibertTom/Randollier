<template>
  <div :class="styles.heroContainer">
    <div :class="styles.heroText" v-reveal>
      <h1>Randollier</h1>
      <p>Tout l'équipement nécessaire pour vos randonnées</p>
      <Button :class="styles.ctaBtn" @click="router.push('/catalogue')">Découvrez notre catalogue</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import styles from './heroSection.module.css'

const router = useRouter()
</script>
