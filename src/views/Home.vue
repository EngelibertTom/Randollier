<template>
  <div class="mainContainer">
    <HeroSection/>
    <ProductsSection/>
    <CategoriesSection/>
    <CertifsSection/>
  </div>
</template>

<script setup lang="ts">
import ProductsSection from '@/components/sections/productsSection/ProductsSection.vue';
import HeroSection from '@/components/sections/heroSection/HeroSection.vue';
import CategoriesSection from '@/components/sections/categoriesSection/CategoriesSection.vue';
import CertifsSection from '@/components/sections/certifsSection/CertifsSection.vue';
</script>