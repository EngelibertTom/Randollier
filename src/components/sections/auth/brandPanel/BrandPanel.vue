<template>
  <div :class="styles.panel">
    <router-link to="/" :class="styles.logo">Randollier</router-link>
    <div :class="styles.content">
      <h2 :class="styles.headline">L'équipement qui vous emmène plus loin</h2>
      <p :class="styles.sub">
        Sacs à dos, chaussures, vêtements techniques… tout ce qu'il faut pour
        partir en randonnée en toute sérénité, livré chez vous en 48h.
      </p>
      <div :class="styles.badges">
        <span :class="styles.badge">Livraison offerte dès 80€</span>
        <span :class="styles.badge">Retours gratuits 30 jours</span>
        <span :class="styles.badge">Paiement sécurisé</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './BrandPanel.module.css'
</script>
