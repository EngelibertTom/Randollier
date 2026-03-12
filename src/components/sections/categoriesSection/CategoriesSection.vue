<template>
    <h2>Trouver tout ce qu'il vous faut</h2>
 
    <div :class="styles.categories">
        <div v-for="category in categories">
            <CategoryCard :name="category.name" :img="category.img" :alt="category.alt"/>
        </div>
    </div>



</template>
<script setup lang="ts">
import CategoryCard from '../../categoryCard/CategoryCard.vue';
import styles from './CategoriesSection.module.css'

import menImg from '@/assets/images/men.png'
import womanImg from '@/assets/images/woman.png'
import sacImg from '@/assets/images/sac.png'
import batonsImg from '@/assets/images/batons.jpg'

const categories = [
  { name: "Homme", img: menImg, alt: "image de la categorie homme" },
  { name: "Femme", img: womanImg, alt: "image de la categorie femme" },
  { name: "Sacs", img: sacImg, alt: "image de la categorie sac" },
  { name: "Équipements", img: batonsImg, alt: "image de la categorie équipements" },
]
</script>