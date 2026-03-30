<script setup lang="ts">
import MainSection from '../components/sections/cart/mainSection/MainSection.vue'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
</script>

<template>
  <div class="mainContainer">
    <Breadcrumb :items="[{ label: 'Accueil', to: '/' }, { label: 'Panier' }]" />
    <MainSection />
  </div>
</template>
