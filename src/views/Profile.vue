<script setup lang="ts">
import MainSection from '@/components/sections/profile/mainSection/MainSection.vue'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
</script>

<template>
  <div class="mainContainer">
    <Breadcrumb :items="[{ label: 'Accueil', to: '/' }, { label: 'Mon profil' }]" />
    <MainSection />
  </div>
</template>
