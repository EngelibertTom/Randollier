<template>
  <div class="mainContainer">
    <HeroSection/>
    <ProductsSection/>
    <CategoriesSection/>
    <CertifsSection/>
  </div>
</template>

<script setup lang="ts">
import ProductsSection from '@/components/sections/home/productsSection/ProductsSection.vue';
import HeroSection from '@/components/sections/home/heroSection/HeroSection.vue';
import CategoriesSection from '@/components/sections/home/categoriesSection/CategoriesSection.vue';
import CertifsSection from '@/components/sections/home/certifsSection/CertifsSection.vue';
</script>