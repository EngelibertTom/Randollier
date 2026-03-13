<template>
    <div :class="styles.certifs">
        <div :class="styles.certif">
            <img src="@/assets/images/card.svg"/>
            <p>Paiement sécurisé</p>
        </div>
        <div :class="styles.certif">
            <img src="@/assets/images/delivery.svg"/>
            <p>Livraison rapide</p>
        </div>
        <div :class="styles.certif">
            <img src="@/assets/images/check.svg"/>
            <p>Livraison rapide</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import styles from "./CertifsSection.module.css";
</script>