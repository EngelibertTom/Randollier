<template>
  <div :class="styles.heroContainer">
    <div :class="styles.heroText" v-reveal>
      <h1>Randollier</h1>
      <p>Tout l'équipement nécessaire pour vos randonnées</p>
      <Button :class="styles.ctaBtn">Découvrez notre catalogue</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import styles from './heroSection.module.css'
</script>
