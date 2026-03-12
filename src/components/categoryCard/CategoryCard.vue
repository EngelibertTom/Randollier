<template>

     <div :class="styles.card">

        <img 
        :src="img" 
        :alt="alt" 
        :class="styles.image"
        />

  </div>

  <h3 :class="styles.catName">{{ name }}</h3>

</template>
<script setup lang="ts">

    import styles from './CategoryCard.module.css'

    defineProps({
        name: String,
        alt: String,
        link: String,
        img: String
    })

</script>