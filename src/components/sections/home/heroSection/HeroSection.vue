<template> 
    <div :class="styles.heroContainer">
        <div :class="styles.heroText">
            <h1>Randollier</h1>
            <p>Tout l'équipement nécessaire pour vos randonnées</p>
            <Button text="Découvrez notre catalogue"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import styles from './heroSection.module.css'
</script>